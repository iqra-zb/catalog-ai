import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function SectionCard({
  title,
  children,
}: Props) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}