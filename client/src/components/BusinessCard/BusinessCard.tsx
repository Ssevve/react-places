interface BusinessCardProps {
  business: any;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
  return <div>{business.name}</div>;
};
