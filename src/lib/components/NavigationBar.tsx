import { SvgIconComponent } from '@mui/icons-material';
import { Breadcrumbs, Link, Typography, Icon, Box } from '@mui/material';
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
              <Box key={p.description} display="flex" alignItems="center" justifyContent="center">
                <Box ml={3} mr={1} display="flex" alignItems="center">
                  {p.icon && <Icon component={p.icon} />}
                </Box>
                <Box>
                  <Link
                    variant="body2"
                    onClick={() => onExit(p.onClick as () => void)}
                    sx={{
                      fontWeight: 'fontWeightRegular',
                      fontSize: 'fontSize',
                      color: '#17324D !important',
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
                <Box mr={1} display="flex" alignItems="center">
                  {p.icon && <Icon component={p.icon} />}
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
      </Box>
    </Box>
  );
}
