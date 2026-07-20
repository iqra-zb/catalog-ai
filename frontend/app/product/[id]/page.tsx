interface Props {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: Props) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Product {params.id}
      </h1>
    </div>
  );
}