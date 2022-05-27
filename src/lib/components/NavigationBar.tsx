import { SvgIconComponent } from '@mui/icons-material';
import { Breadcrumbs, Link, Typography, Icon, Box } from '@mui/material';
import React from 'react';
import { useUnloadEventOnExit } from '../hooks/useUnloadEventInterceptor';
import BackComponent from './BackComponent';

type Props = {
  paths: Array<NavigationPath>;
  goBack: () => void;
  backLinkTextDecoration?: string;
  backLinkFontWeight?: string;
  backLinkFontSize?: string;
};

export type NavigationPath = {
  description: string;
  onClick?: () => void;
  icon?: SvgIconComponent;
};

export default function NavigationBar({
  paths,
  goBack,
  backLinkTextDecoration,
  backLinkFontWeight,
  backLinkFontSize,
}: Props) {
  const onExit = useUnloadEventOnExit();

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb">
        <BackComponent
          goBack={goBack}
          backLinkTextDecoration={backLinkTextDecoration}
          backLinkFontWeight={backLinkFontWeight}
          backLinkFontSize={backLinkFontSize}
        />
        {paths.map((p) =>
          p.onClick ? (
            <Box display="flex" key={p.description} alignItems="center">
              <Box>
                {p.icon && (
                  <Icon sx={{ mx: 1, fontSize: '24px', display: 'flex' }} component={p.icon} />
                )}
              </Box>
              <Box>
                <Link
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
              </Box>
            </Box>
          ) : (
            <Box display="flex" key={p.description} alignItems="center">
              <Box>
                {p.icon && (
                  <Icon sx={{ mx: 1, fontSize: '24px', display: 'flex' }} component={p.icon} />
                )}
              </Box>
              <Box>
                <Typography key={p.description} variant="body2" sx={{ color: 'text.secondary' }}>
                  {p.description}
                </Typography>
              </Box>
            </Box>
          )
        )}
      </Breadcrumbs>
    </React.Fragment>
  );
}
