interface BusinessCardContactInfoProps {
  phone: string;
  yelpUrl: string | undefined;
  address: string[];
}

export function BusinessCardContactInfo({ phone, yelpUrl, address }: BusinessCardContactInfoProps) {
  return (
    <div>
      <span>{phone}</span>
      <span>{yelpUrl}</span>
      <p>{address.join('\n')}</p>
    </div>
  );
}
