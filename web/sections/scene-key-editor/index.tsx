import React, { useEffect, useState } from "react";
import { Typography, FormControl, Select, MenuItem } from "@material-ui/core";
import EditableTextCard from "../../components/g11n/editable-text-card";
import { currentEditorialLocaleAtom } from "../../states/editor-state"
import { useRecoilState } from "recoil";
import { DesignGlobalizationRepository } from "@bridged.xyz/client-sdk/lib/g11n/repository"
import { LayerTranslation } from "@bridged.xyz/client-sdk/lib/g11n";

const SceneKeyEditor = (props: {
  repository: DesignGlobalizationRepository
}) => {
  const { repository } = props

  const [translations, setTranslations] = useState<ReadonlyArray<LayerTranslation>>([])
  const [locale, setLocale] = useRecoilState(currentEditorialLocaleAtom);
  const handleLocaleSelectChange = (e: any) => {
    setLocale(e.target.value as string);
  };


  useEffect(() => {
    let mounted = true;
    console.log('fetching translations under scene', props.repository.sceneId)
    repository.fetchTranslations().then((d) => {
      console.log('fetched translations under scene', props.repository.sceneId, d)
      setTranslations(d)
    }).catch(e => {
      console.error(e)
    })
  }, [])

  return (
    <>
      <div>
        <div className="fileDepthTitle">
          <Typography variant="subtitle1">navigation1/</Typography>
        </div>
        <div className="screenName">
          <Typography variant="h2">Screen Name</Typography>
        </div>
        <div>
          <Typography
            variant="subtitle1"
            align="left"
            style={{ float: "left" }}
          >
            {translations.length} keys
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            style={{ float: "left" }}
          >
            32 Texts
          </Typography>
          <Typography variant="subtitle1" align="left">
            12 Components
          </Typography>
        </div>
        <div style={{ marginTop: "10px", marginBottom: "40px" }}>
          <FormControl>
            <Select value={locale} onChange={handleLocaleSelectChange}>
              <MenuItem value="ko">Ko</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ja">JP</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          {
            translations.map((t) => {
              return <EditableTextCard translation={t.translation} />
            })
          }
        </div>
      </div>
    </>
  );
};

export default SceneKeyEditor;
