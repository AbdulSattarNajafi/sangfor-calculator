import { Text } from "@react-pdf/renderer";

function BoldText({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ fontWeight: "bold", fontSize: 12 }}>{children}&nbsp;</Text>
  );
}

export default BoldText;
