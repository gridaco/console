import React from 'react';
import { Typography, Input } from '@material-ui/core';

import IconEn from '../../assets/lang-icon-en';
import IconKr from '../../assets/lang-icon-kr';
import IconJp from '../../assets/lang-icon-jp';

const EditableLangColumn = () => {
  const langIcon = (type: string) => {
    if (type == 'en') return <IconEn />;
    if (type === 'ko') return <IconKr />;
    if (type == 'jp') return <IconJp />;
  };

  return (
    <>
      <div>
        <div>{langIcon('en')}</div>
        <div>
          <Input defaultValue="u" disabled={true} />
        </div>
        <div>
          <Typography>jp/JP</Typography>
        </div>
      </div>
    </>
  );
};

export default EditableLangColumn;
