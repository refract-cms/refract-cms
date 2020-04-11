import React from 'react';
import { Link } from '@reach/router';

export const createLinkComponent = (to: string) => React.forwardRef((props, ref) => <Link {...props} to={to} />) as any;
