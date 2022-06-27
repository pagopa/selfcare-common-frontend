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

  return (
    <Box display="flex">
      {showBackComponent && (
        <Box>
          <BackComponent goBack={goBack} />
        </Box>
      )}
      <Box display="flex" alignItems={'center'}>
        <Breadcrumbs aria-label="breadcrumb">
          {paths.map((p) =>
            p.onClick ? (
              <Box
                key={p.description}
                display="flex"
                alignItems="center"
                justifyContent="center"
                ml={2}
              >
                <ButtonNaked
                  component="button"
                  onClick={() => onExit(p.onClick as () => void)}
                  startIcon={p.icon && <Icon component={p.icon} />}
                  sx={{ color: 'colorTextPrimary' }}
                  weight="default"
                >
                  <Typography variant="body2">{p.description}</Typography>
                </ButtonNaked>
              </Box>
            ) : (
              <Box display="flex" key={p.description} alignItems="center">
                {p.icon && (
                  <Box mr={1} display="flex" alignItems="center">
                    <Icon component={p.icon} />
                  </Box>
                )}
                <Box>
                  <Typography
                    key={p.description}
                    variant="body2"
                    sx={{ color: 'text.secondary', fontSize: 'fontSize' }}
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
