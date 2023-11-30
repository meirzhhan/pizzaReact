import ContentLoader from 'react-content-loader';

const PizzaSkeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="130" y="424" rx="30" ry="30" width="150" height="43" />
    <rect x="0" y="440" rx="10" ry="10" width="91" height="27" />
    <rect x="0" y="316" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="269" rx="10" ry="10" width="280" height="27" />
    <circle cx="140" cy="122" r="122" />
  </ContentLoader>
);

export default PizzaSkeleton;
