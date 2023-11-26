interface BusinessContactInfoProps {
  phone: string;
  yelpUrl: string | undefined;
  address: string[];
}

export function BusinessContactInfo({ phone, yelpUrl, address }: BusinessContactInfoProps) {
  return (
    <div>
      <span>{phone}</span>
      <span>{yelpUrl}</span>
      <p>{address.join('\n')}</p>
    </div>
  );
}
