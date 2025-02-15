import { View, Image } from "@react-pdf/renderer";

function Logo() {
  return (
    <>
      <View
        style={{
          backgroundColor: "#0070c0",
          paddingHorizontal: 30,
          paddingVertical: 10,
          marginBottom: 20,
        }}
      >
        <Image style={{ width: "100px", height: "auto" }} src="/logo.png" />
      </View>
    </>
  );
}

export default Logo;
