import React from "react";
const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#070709] relative rounded-none">
      {children}
      <div
        className="absolute inset-0 md:translate-x-full rotate-180"
        style={{
          content: "",
          position: "absolute",
          zIndex: "0",
          top: 0,
          right: 0,
          width: "50%",
          height: "80%",
          borderRadius: "900px",
          background:
            "linear-gradient(180deg, rgba(167, 36, 104, 0.80) 0%, rgba(14, 37, 157, 0.80) 100%)",
          filter: "blur(250px)",
        }}
      />
    </div>
  );
};

export default LayoutAdmin;
