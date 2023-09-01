import { useEffect, useRef } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const Sidebar = ({ show, setShow }: { show: boolean; setShow: any }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current !== null &&
        !menuRef.current.contains((e as any).target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div
      className={`w-full ${
        show && "active"
      } max-w-fit w-full md:block hidden border-[#303030] bg-transparent text-white border p-4`}
      ref={menuRef}
    >
      <div>
        <CustomLink
          activeOnlyWhenExact={true}
          icon={"/assets/allusers.svg"}
          to="/admin/allusers"
          text={"All users"}
        />
        <CustomLink
          activeOnlyWhenExact={true}
          icon={"/assets/admintransfer.svg"}
          to="/admin/allusers/transactions"
          text={"Transactions"}
        />
        <CustomLink
          activeOnlyWhenExact={true}
          icon={"/assets/claimrequest.svg"}
          to="/admin/allusers/claimrequest"
          text={"Claim Requests"}
        />
      </div>
    </div>
  );
};

export default Sidebar;

function CustomLink({
  children,
  icon,
  text,
  to,
  activeOnlyWhenExact,
  ...props
}: {
  children?: any;
  icon?: any;
  text?: any;
  to?: any;
  activeOnlyWhenExact?: any;
  props?: any;
}) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div className="w-full pr-5">
      <Link
        className={`${
          match && "active-items-sidebar"
        } hover:bg-dark-500 text-left text-base  py-2 px-4 rounded-md flex items-center mb-3 transition-all`}
        to={to}
        {...props}
      >
        <span className=" mr-3 w-8 h-8 flex justify-center items-center rounded-full  text-indigo flex-shrink-0">
          <img src={icon} className="w-5" />
        </span>
        <span>{text}</span>
      </Link>
    </div>
  );
}
