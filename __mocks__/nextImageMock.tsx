/* istanbul ignore file */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

const NextImage = ({ src = '', alt = 'image', ...rest }: { src?: string; alt?: string } & Record<string, unknown>) => (
  <img src={typeof src === 'string' ? src : ''} alt={alt as string} {...rest} />
);

export default NextImage;
