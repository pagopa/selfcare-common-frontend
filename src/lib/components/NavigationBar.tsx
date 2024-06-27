import { SvgIconComponent } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Breadcrumbs, Icon, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useUnloadEventOnExit } from '../hooks/useUnloadEventInterceptor';
import BackComponent from './BackComponent';

type Props = {
  paths: Array<NavigationPath>;
  goBack?: () => void;
  backLabel?: string;
  backLinkTextDecoration?: string;
  backLinkFontWeight?: string;
  backLinkFontSize?: string;
  showBackComponent?: boolean;
};

export type NavigationPath = {
  description: string;
  onClick?: () => void;
  icon?: SvgIconComponent;
};

export default function NavigationBar({ paths, goBack, showBackComponent, backLabel }: Props) {
  const onExit = useUnloadEventOnExit();

  const truncatedText = {
    display: 'inline-block',
    maxWidth: '50ch',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <Box display="flex">
      {showBackComponent && (
        <Box mr={2} display="flex" alignItems={'center'}>
          <BackComponent goBack={goBack} backLabel={backLabel} />
        </Box>
      )}
      {!showBackComponent && (
        <Box display="flex" alignItems={'center'}>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<ArrowForwardIosIcon style={{ height: '8px', width: '8px' }} />}
          >
            {paths.map((p) =>
              p.onClick ? (
                <Box key={p.description} display="flex" alignItems="center" justifyContent="center">
                  <ButtonNaked
                    component="button"
                    onClick={() => onExit(p.onClick as () => void)}
                    startIcon={p.icon && <Icon component={p.icon} />}
                    sx={{ color: 'colorTextPrimary' }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ ...truncatedText, fontWeight: 'fontWeightMedium' }}
                    >
                      {p.description}
                    </Typography>
                  </ButtonNaked>
                </Box>
              ) : (
                <Box display="flex" key={p.description}>
                  {p.icon && (
                    <Box mr={1} display="flex" alignItems="center">
                      <Icon component={p.icon} />
                    </Box>
                  )}
                  <Box display="flex" alignItems="center">
                    <Typography
                      key={p.description}
                      variant="body2"
                      sx={{ ...truncatedText, color: 'text.disabled', fontSize: 'fontSize' }}
                    >
                      {p.description}
                    </Typography>
                  </Box>
                </Box>
              )
            )}
          </Breadcrumbs>
        </Box>
      )}
    </Box>
  );
}
