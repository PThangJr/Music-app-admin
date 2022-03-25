import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import AlbumIcon from '@mui/icons-material/Album';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
const routes = [
  {
    path: '/songs',
    Icon: <LibraryMusicIcon />,
    name: 'Songs',
  },
  {
    path: '/categories',
    Icon: <CategoryIcon />,
    name: 'Categories',
  },
  {
    Icon: <ArtTrackIcon />,
    name: 'Album Groups',
    path: '/album_groups',
  },
  {
    path: '/albums',
    Icon: <AlbumIcon />,
    name: 'Albums',
  },
  {
    path: '/singers',
    Icon: <PersonIcon />,
    name: 'Singers',
  },
  {
    path: '/authors',
    Icon: <PersonOutlineIcon />,
    name: 'Authors',
  },
];

export default routes;
