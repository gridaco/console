import { RawAsset } from '@bridged.xyz/client-sdk/lib/assets';
import {
  GlobalizedKey,
  IGlobalizedKey,
} from '@bridged.xyz/client-sdk/lib/g11n';
import { Grid } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useRecoilState } from 'recoil';
import { currentEditorialLocaleAtom } from '../../states/editor-state';
import { TranslationFieldRow } from './translation-field';

export default function (props: { translation: IGlobalizedKey }) {
  const { translation } = props;
  const [editorialLoclae] = useRecoilState(currentEditorialLocaleAtom);
  const defaultLocaleTranslationValue =
    (translation.translations as any)[editorialLoclae]?.value ??
    'no translation';

  const handleOnTranslationValueChange = (locale: string, value: string) => {
    console.log('handleOnTranslationValueChange', locale, value);
  };

  return (
    <Accordion style={{ padding: '20px' }}>
      <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
        <Grid container>
          <Grid item xs>
            <Typography variant="subtitle1">{translation.key}</Typography>
            <br />
            <Typography variant="caption">
              {defaultLocaleTranslationValue}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Box
              p={1}
              color={'#62D066'}
              style={{
                borderRadius: 4,
                backgroundColor: '#DDFFDE',
              }}
            >
              <Typography align="center">3/3</Typography>
            </Box>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {Object.keys(translation.translations).map((k) => {
            const keyId = translation.id;
            const localekey = k;
            const localeTranslationAsset = (translation.translations as any)[
              localekey
            ] as RawAsset;
            const localeTranslationValue = localeTranslationAsset.value;
            return (
              <li>
                <TranslationFieldRow
                  key={keyId}
                  locale={localekey}
                  initialValue={localeTranslationValue}
                  onSubmit={handleOnTranslationValueChange}
                />
              </li>
            );
          })}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
}
