import React, { useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import {
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { targetLayerSelector } from '../../states';
import { useRecoilValue } from 'recoil';
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
  const [mode, setMode] = useState<SingleKeyEditorMode>('loading');
  const [existingKey, setExistingKey] = useState<IGlobalizedKey>(undefined!);

  useEffect(() => {
    repository
      .fetchTranslation(targetLayer.nodeId)
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

  switch (mode) {
    case 'loading':
      return <SingleKeyEditorLoadingState />;
    case 'create-new':
      return (
        <SingleKeyEditorCreateNewState
          layer={targetLayer}
          repository={repository}
        />
      );
    case 'edit-existing':
      return (
        <SingleKeyEditorEditExistingState
          layer={targetLayer}
          repository={repository}
          gkey={existingKey}
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
      value: value,
    });
  };

  return (
    <>
      <div>
        <div className="fileDepthTitle">
          <Typography variant="subtitle1">navigation1/</Typography>
        </div>
        <div className="textKey">
          <Typography variant="h2">Add Key</Typography>
          <Typography variant="h6">
            no key is set for selected layer "{textValue}"
          </Typography>
          <Typography variant="h6">STATE: {state}</Typography>
        </div>
        <Box marginTop={2} marginBottom={2}>
          <Box m={2}>
            <TextField
              label="Key Name"
              onChange={handleKeyNameEdit}
              autoFocus
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box m={2}>
            <TranslationSetForKey
              key={keyname}
              locales={repository.locales}
              onSubmit={handleInitialTranslationChange}
            />
          </Box>
        </Box>
        <Button variant="contained" onClick={handleCreateKeyClick}>
          create key
        </Button>
      </div>
    </>
  );
}

function SingleKeyEditorEditExistingState(props: {
  layer: StorableLayer;
  gkey: IGlobalizedKey;
  repository: DesignGlobalizationRepository;
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
      value: value,
    });
  };

  return (
    <>
      <Header title="Rename Key" />
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
