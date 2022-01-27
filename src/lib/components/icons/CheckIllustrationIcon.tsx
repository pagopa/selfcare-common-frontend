import SvgIcon, { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';

export default (props: DefaultComponentProps<SvgIconTypeMap>) => (
  <SvgIcon
    width="120" 
    height="120"
    viewBox="0 0 120 120"
    sx={{ width: '120px', height: '120px' }}
    fill="none"
    {...props}
  >
    <mask
      id="mask0_4967_20179"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="120"
      height="120"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.9565 0.506348C27.1467 0.506348 0.452393 27.2007 0.452393 60.0105C0.452393 92.8203 27.1467 119.515 59.9565 119.515C92.7663 119.515 119.461 92.8203 119.461 60.0105C119.461 27.2007 92.7663 0.506348 59.9565 0.506348ZM59.9565 113.569C30.4229 113.569 6.39795 89.5441 6.39795 60.0105C6.39795 30.4768 30.4229 6.45191 59.9565 6.45191C89.4902 6.45191 113.515 30.4768 113.515 60.0105C113.515 89.5441 89.4902 113.569 59.9565 113.569ZM52.7248 68.2129L75.5363 45.5227C76.7012 44.3579 78.5698 44.3579 79.7346 45.5227C80.8752 46.6876 80.8752 48.5562 79.7103 49.721L54.7875 74.4982C54.2051 75.0807 53.4528 75.3719 52.7005 75.3719C51.924 75.3719 51.1717 75.0807 50.5892 74.4982L40.1784 64.0146C39.0379 62.8498 39.0379 60.9569 40.2027 59.8163C41.3675 58.6758 43.2362 58.6758 44.401 59.8406L52.7248 68.2129Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_4967_20179)">
      <rect x="-8.92554" y="-23.8018" width="144.793" height="152.727" fill="#00C5CA" />
    </g>
  </SvgIcon>
);
