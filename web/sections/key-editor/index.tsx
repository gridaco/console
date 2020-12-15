import React, { useState } from "react";
import { Typography, TextField, Box, Button } from "@material-ui/core";
import { targetLayerSelector, currentTextEditValueAtom } from "../../states"
import { useRecoilState, useRecoilValue } from "recoil";
import { StorableLayerType } from "@bridged.xyz/client-sdk/lib";
import { TextManifest } from "@reflect.bridged.xyz/core";
import { TranslationSetForKey } from "../../components/g11n/translation-set-for-key";

type SingleKeyEditorMode = 'create-new' | 'edit-existing'
/**
 * provides interface for editing focused single key. creating, and editing the key name and translations's value
 */
function SingleKeyEditor() {

  // find key by layer id

  const targetLayer = useRecoilValue(targetLayerSelector)
  const [keyname, setkeyname] = useState<string>('')

  const mode: SingleKeyEditorMode = 'create-new'

  const handleKeyNameEdit = (e: any) => {
    const v = e.target.value
    console.log('key name being edited as value of', v)
    setkeyname(v)
  }

  const textValue = targetLayer?.type === StorableLayerType.text ? (targetLayer?.data as TextManifest).text : 'this is not a text'

  return (
    <>
      <div>
        <div className="fileDepthTitle">
          <Typography variant="subtitle1">navigation1/</Typography>
        </div>
        <div className="textKey">
          <Typography variant="h2">Add Key</Typography>
          <Typography variant="h6">no key is set for selected layer "{textValue}"</Typography>
        </div>
        <Box marginTop={2} marginBottom={2}>
          <Box m={2}>
            <TextField label='Key Name' onChange={handleKeyNameEdit} autoFocus fullWidth variant='outlined' />
          </Box>
          <Box m={2}>
            <TranslationSetForKey key={keyname} />
          </Box>
        </Box>
        <Button variant='contained'>create key</Button>
      </div>
    </>
  );
};

export default SingleKeyEditor;
