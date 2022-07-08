import { SvgIconComponent } from '@mui/icons-material';
import { Breadcrumbs, Typography, Icon, Box } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useUnloadEventOnExit } from '../hooks/useUnloadEventInterceptor';
import BackComponent from './BackComponent';

type Props = {
  paths: Array<NavigationPath>;
  goBack?: () => void;
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

export default function NavigationBar({ paths, goBack, showBackComponent }: Props) {
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
          <BackComponent goBack={goBack} />
        </Box>
      )}
      <Box display="flex" alignItems={'center'}>
        <Breadcrumbs aria-label="breadcrumb">
          {paths.map((p) =>
            p.onClick ? (
              <Box key={p.description} display="flex" alignItems="center" justifyContent="center">
                <ButtonNaked
                  component="button"
                  onClick={() => onExit(p.onClick as () => void)}
                  startIcon={p.icon && <Icon component={p.icon} />}
                  sx={{ color: 'colorTextPrimary' }}
                  weight="default"
                >
                  <Typography variant="body2" sx={truncatedText}>
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
                    sx={{ ...truncatedText, color: 'text.secondary', fontSize: 'fontSize' }}
                  >
                    {p.description}
                  </Typography>
                </Box>
              </Box>
            )
          )}
        </Breadcrumbs>
      </Box>
    </Box>
  );
}
