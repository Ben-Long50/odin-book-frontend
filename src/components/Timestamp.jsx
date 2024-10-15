import { formatDistance } from 'date-fns';

const Timestamp = (props) => {
  const timestamp = formatDistance(new Date(props.date), new Date());

  return <p className="text-tertiary text-sm">{timestamp}</p>;
};

export default Timestamp;
