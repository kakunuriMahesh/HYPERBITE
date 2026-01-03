import React, { forwardRef, useEffect, useState } from "react";
import { productConfigs } from "../config/productConfig";
import DatesTimeline from "./DatesTimeline";
import NutsLayout from "./NutsLayout";
import SeedsLayout from "./SeedsLayout";

const HeroBanner = forwardRef(
  ({ productType = "nuts", onOpenDetails }, ref) => {
    const [breakpoint, setBreakpoint] = useState("desktop");

    // Get product configuration
    const productConfig = productConfigs[productType] || productConfigs.nuts;

    const isDates = productType === "dates";

    useEffect(() => {
      const updateBreakpoint = () => {
        const viewportWidth = window.innerWidth;
        let newBreakpoint = "desktop";

        if (viewportWidth < 768) {
          newBreakpoint = "mobile";
        } else if (viewportWidth < 1024) {
          newBreakpoint = "tablet";
        } else {
          newBreakpoint = "desktop";
        }

        setBreakpoint(newBreakpoint);
      };

      updateBreakpoint();
      window.addEventListener("resize", updateBreakpoint);
      return () => window.removeEventListener("resize", updateBreakpoint);
    }, []);


    return (
        <div
          ref={ref}
          className="bg-white w-full relative"
          style={{ overflowX: "hidden", overflowY: "auto", paddingTop: "70px" }}
        >
          {isDates ? (
            <DatesTimeline
              productConfig={productConfig}
              onOpenDetails={onOpenDetails}
              breakpoint={breakpoint}
            />
          ) : productType === "seeds" ? (
            <SeedsLayout
              productConfig={productConfig}
              breakpoint={breakpoint}
              onOpenDetails={onOpenDetails}
            />
          ) : (
            <NutsLayout
              productConfig={productConfig}
              breakpoint={breakpoint}
              onOpenDetails={onOpenDetails}
            />
          )}
        </div>
    );
  }
);

HeroBanner.displayName = "HeroBanner";

export default HeroBanner;