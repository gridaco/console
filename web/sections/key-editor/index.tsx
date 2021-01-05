import React, { useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { CircularProgress } from '@material-ui/core';
import { targetLayerIdAtom, targetLayerSelector } from '../../states';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  NestedAssetPutRequest,
  StorableLayer,
  StorableLayerType,
} from '@bridged.xyz/client-sdk/lib';
import { TextManifest } from '@reflect.bridged.xyz/core';
import { TranslationSetForKey } from '../../components/g11n/translation-set-for-key';
import { DesignGlobalizationRepository } from '@bridged.xyz/client-sdk/lib/g11n/repository';
import { IGlobalizedKey, Translations } from '@bridged.xyz/client-sdk/lib/g11n';
import Header from './header';
import TextInput from '../../components/g11n/text-input';

type SingleKeyEditorMode = 'create-new' | 'edit-existing' | 'loading';
/**
 * provides interface for editing focused single key. creating, and editing the key name and translations's value
 */
export default function SingleKeyEditor(props: {
  repository: DesignGlobalizationRepository;
}) {
  const { repository } = props;
  const targetLayer = useRecoilValue(targetLayerSelector);
  const setTargetLayerId = useSetRecoilState(targetLayerIdAtom);
  const [mode, setMode] = useState<SingleKeyEditorMode>('loading');
  const [existingKey, setExistingKey] = useState<IGlobalizedKey>(undefined!);

  const goBack = () => {
    setTargetLayerId(undefined);
  };

  useEffect(() => {
    repository
      // FIXME: layerId type to 'string | undefined' (client-sdk)
      .fetchTranslation(targetLayer?.nodeId || '')
      .then((d) => {
        if (d) {
          setExistingKey(d);
          setMode('edit-existing');
        } else {
          setMode('create-new');
        }
      })
      .catch((e) => {
        setMode('create-new');
      });
  }, []);

  if (!targetLayer) {
    goBack();
    return null;
  }

  switch (mode) {
    case 'loading':
      return <SingleKeyEditorLoadingState />;
    case 'create-new':
      return (
        <SingleKeyEditorCreateNewState
          layer={targetLayer}
          repository={repository}
          goBack={goBack}
        />
      );
    case 'edit-existing':
      return (
        <SingleKeyEditorEditExistingState
          layer={targetLayer}
          repository={repository}
          gkey={existingKey}
          goBack={goBack}
        />
      );
  }
}

function SingleKeyEditorLoadingState() {
  return (
    <ProgressContainer>
      <CircularProgress />
    </ProgressContainer>
  );
}

function SingleKeyEditorCreateNewState(props: {
  layer: StorableLayer;
  repository: DesignGlobalizationRepository;
  goBack: () => void;
}) {
  const { layer, repository } = props;
  const [state, setState] = useState<string>('loaded');
  const [keyname, setkeyname] = useState<string>('');
  const initialTranslations = new Map<string, NestedAssetPutRequest>();

  const handleKeyNameEdit = (e: any) => {
    const v = e.target.value;
    setkeyname(v);
  };

  const handleCreateKeyClick = (e: any) => {
    console.log('creating with', keyname, initialTranslations);

    setState('creating');

    repository
      .registerTextKey(layer.nodeId, {
        keyName: keyname,
        embeddable: false,
        initialTranslations: initialTranslations,
        // {
        //   'aa': {
        //     value: ''
        //   }
        // }
      })
      .then((d) => {
        setState('created');
      });
    // repository
  };

  const textValue =
    layer?.type === StorableLayerType.text
      ? (layer?.data as TextManifest).text
      : 'this is not a text';

  const handleInitialTranslationChange = (locale: string, value: string) => {
    initialTranslations.set(locale, {
      value,
    });
  };

  return (
    <>
      <Header title="Add Key" onClickBack={props.goBack}>
        <Button onClick={handleCreateKeyClick}>
          <span>+ Add Key</span>
        </Button>
      </Header>
      <EditorContent>
        {/*
          no key is set for selected layer "{textValue}"
          STATE: {state}
        */}
        <FieldWrapper>
          <InputField>Key Name</InputField>
          <TextInput onChange={handleKeyNameEdit} disabled />
        </FieldWrapper>
        <FieldWrapper>
          <InputField>Value</InputField>
          <TranslationSetForKey
            key={keyname}
            locales={repository.locales}
            onSubmit={handleInitialTranslationChange}
          />
        </FieldWrapper>
      </EditorContent>
    </>
  );
}

function SingleKeyEditorEditExistingState(props: {
  layer: StorableLayer;
  gkey: IGlobalizedKey;
  repository: DesignGlobalizationRepository;
  goBack: () => void;
}) {
  const repository = props.repository;

  const [translations, setTranslations] = useState<Translations>();
  // fetch initial translations
  useEffect(() => {
    repository.fetchTranslation(props.layer.nodeId).then((v) => {
      console.log(
        'SingleKeyEditorEditExistingState : fetched translation',
        v?.translations
      );
      setTranslations(v?.translations);
    });
  }, []);

  const handleTranslationUpdate = (locale: string, value: string) => {
    repository.putTextTranslation(props.layer.nodeId, {
      keyId: props.gkey.id,
      locale: locale,
      value,
    });
  };

  return (
    <>
      <Header title="Rename Key" onClickBack={props.goBack} />
      <EditorContent>
        <FieldWrapper>
          <InputField>Key Name</InputField>
          <TextInput value={props.gkey.key} disabled />
        </FieldWrapper>
        <FieldWrapper>
          <InputField>Value</InputField>
          {translations !== undefined ? (
            <TranslationSetForKey
              key={props.gkey.key}
              locales={repository.locales}
              onSubmit={handleTranslationUpdate}
              translations={translations}
            />
          ) : (
            <ProgressContainer>
              <CircularProgress />
            </ProgressContainer>
          )}
        </FieldWrapper>
      </EditorContent>
    </>
  );
}

const ProgressContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditorContent = styled.div`
  padding: 24px 32px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const InputField = styled.h2`
  margin: 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.2;
  color: #888888;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background: #151617;
  border-radius: 6px;
  padding: 12px;
  border: 0;
  cursor: pointer;

  & > span {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: 0.3px;
    color: #ffffff;
  }
`;
