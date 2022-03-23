import { Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import { useUnloadEventOnExit } from '../hooks/useUnloadEventInterceptor';

export type NavigationPath = {
  description: string;
  onClick?: () => void;
};

type Props = {
  paths: Array<NavigationPath>;
};

export default function NavigationBar({ paths }: Props) {
  const onExit = useUnloadEventOnExit();

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb">
        {paths.map((p) =>
          p.onClick ? (
            <Link
              key={p.description}
              variant="body2"
              onClick={() => onExit(p.onClick as () => void)}
              sx={{
                fontWeight: '700',
                color: '#5C6F82 !important',
                textDecoration: 'none !important',
                cursor: 'pointer',
              }}
            >
              {p.description}
            </Link>
          ) : (
            <Typography key={p.description} variant="body2" sx={{ color: 'text.secondary' }}>
              {p.description}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </React.Fragment>
  );
}
