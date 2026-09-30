import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/baa-logo.svg";
import {
  aboutLinks,
  preojectsLinks,
  resourcesLinks,
  servicesLinks,
  socialLinks,
} from "@/constants/constants";
import NavigationHashLink from "../common/NavigationHashLink";

const Footer = () => {
  return (
    <footer className="bg-[#EFECEB] px-[2rem] py-[6rem] md:px-[4rem] md:py-[8rem]">
      <div className="mx-auto grid max-w-[124rem] grid-cols-1 rounded-[1.2rem] bg-white lg:grid-cols-[30%_70%]">
        <div className="flex flex-col justify-between gap-[4rem] border-b border-[#C9C9C9] p-[2rem] md:p-[4rem] lg:border-r lg:border-b-0">
          <div className="flex flex-col gap-[1rem]">
            <NavLink
              to="/"
              className="inline-flex max-w-[12rem] overflow-hidden"
            >
              <img
                src={Logo}
                alt="Brand Logo"
                className="size-full object-contain"
              />
            </NavLink>

            <p className="text-[1.4rem] leading-[2.24rem] font-light">
              Bringing technological ease to manage humanitarian and development work
            </p>
          </div>

          <div className="flex flex-col gap-[1rem]">
            <h5 className="font-normal">Stay connected</h5>

            <div className="flex items-center gap-[1rem]">
              {socialLinks.map((item, idx) => (
                <a
                  target="_blank"
                  key={idx}
                  href={item.link}
                  className="opacity-70 transition-all duration-300 hover:opacity-100"
                >
                  <img
                    src={item.icon}
                    alt="Icon Image"
                    className="size-full object-contain object-center"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-[4rem]">
          <div className="grid grid-cols-2 gap-[4rem] px-[2rem] pt-[2rem] pb-[2rem] md:grid-cols-4 md:gap-[6rem] md:px-[4rem] md:pt-[4rem]">
            <div className="flex flex-col gap-[2rem]">
              <h5 className="font-normal !text-[#006BFF] uppercase">About</h5>

              <div className="flex flex-col items-start gap-[2rem]">
                {aboutLinks.map((item, idx) => (
                  <NavigationHashLink
                    key={idx}
                    link={item.link}
                    label={item.label}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[2rem]">
              <h5 className="font-normal !text-[#006BFF] uppercase">
                Services
              </h5>

              <div className="flex flex-col items-start gap-[2rem]">
                {servicesLinks.map((item, idx) => (
                  <NavigationHashLink
                    key={idx}
                    link={item.link}
                    label={item.label}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[2rem]">
              <h5 className="font-normal !text-[#006BFF] uppercase">
                Projects
              </h5>

              <div className="flex flex-col items-start gap-[2rem]">
                {preojectsLinks.map((item, idx) => (
                  <NavigationHashLink
                    key={idx}
                    link={item.link}
                    label={item.label}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[2rem]">
              <h5 className="font-normal !text-[#006BFF] uppercase">
                Resources
              </h5>

              <div className="flex flex-col items-start gap-[2rem]">
                {resourcesLinks.map((item, idx) => (
                  <NavigationHashLink
                    key={idx}
                    link={item.link}
                    label={item.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="border-t border-[#C9C9C9] p-[1rem] text-center text-[1.4rem] leading-[2.24rem] font-light lg:pl-[4rem] lg:text-left">
            © BAA - Bridging Analytics and Action. 2026 All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
