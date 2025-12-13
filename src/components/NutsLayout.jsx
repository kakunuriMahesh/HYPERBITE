import React from "react";

const NutsLayout = ({ productConfig, breakpoint, nutRefs, vectorRef, onOpenDetails }) => (
  <>
    {/* First Section Heading */}
    <div 
      className="absolute [font-family:'Permanent_Marker-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]" 
      style={{ 
        zIndex: 10,
        top: breakpoint === 'mobile' ? '16%' : breakpoint === 'tablet' ? '16%' : '16%',
        left: breakpoint === 'mobile' ? '20px' : breakpoint === 'tablet' ? '50px' : '12%',
        width: breakpoint === 'mobile' ? 'calc(100% - 40px)' : breakpoint === 'tablet' ? 'calc(100% - 100px)' : '649px',
        fontSize: breakpoint === 'mobile' ? '24px' : breakpoint === 'tablet' ? '36px' : '54px',
        lineHeight: '1.05',
      }}
    >
      {productConfig.heading1}
    </div>

    {/* First Section Paragraph */}
    <p 
      className="absolute [font-family:'Just_Me_Again_Down_Here-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]" 
      style={{ 
        zIndex: 10,
        top: breakpoint === 'mobile' ? 'calc(16% + 80px)' : breakpoint === 'tablet' ? 'calc(16% + 80px)' : 'calc(16% + 80px)',
        left: breakpoint === 'mobile' ? '20px' : breakpoint === 'tablet' ? '50px' : '12%',
        width: breakpoint === 'mobile' ? 'calc(100% - 40px)' : breakpoint === 'tablet' ? 'calc(100% - 100px)' : '420px',
        fontSize: breakpoint === 'mobile' ? '14px' : breakpoint === 'tablet' ? '18px' : '22px',
        lineHeight: '1.1',
        marginTop: '12px',
      }}
    >
      {productConfig.paragraph1}
    </p>

    {/* Quote between first and second section */}
    <div
      className="absolute text-black text-center"
      style={{
        zIndex: 10,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: breakpoint === 'mobile' ? 'calc(100% - 40px)' : breakpoint === 'tablet' ? 'calc(100% - 100px)' : '600px',
        fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
        fontSize: breakpoint === 'mobile' ? '18px' : breakpoint === 'tablet' ? '22px' : '28px',
        lineHeight: '1.3',
        fontStyle: 'italic',
        padding: breakpoint === 'mobile' ? '40px 20px' : breakpoint === 'tablet' ? '50px 20px' : '150px 20px',
      }}
    >
      "{productConfig.quote || 'Crunchy, nutritious, and full of natural goodness'}"
    </div>

    {/* Product Images - Positions set by GSAP based on breakpoint */}
    {/* Hero images - use eager loading since they're above the fold */}
    <img ref={nutRefs.pumpkinseed1} className="absolute aspect-[0.67] object-cover" alt="Product" src={productConfig.images.pumpkinseed1} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, willChange: 'transform', backfaceVisibility: 'hidden' }} />
    <img ref={nutRefs.wallnut1} className="absolute aspect-[0.67] object-cover" alt="Product" src={productConfig.images.wallnut1} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, willChange: 'transform', backfaceVisibility: 'hidden' }} />
    <img ref={nutRefs.sunflowerseed1} className="absolute aspect-[0.67] object-cover" alt="Product" src={productConfig.images.sunflowerseed1} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, willChange: 'transform', backfaceVisibility: 'hidden' }} />
    <img ref={nutRefs.dateorange1} className="absolute aspect-[0.67] object-cover" alt="Product" src={productConfig.images.dateorange1} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, willChange: 'transform', backfaceVisibility: 'hidden' }} />
    <img ref={nutRefs.dateorange2} className="absolute aspect-[0.67] object-cover" alt="Product" src={productConfig.images.dateorange2} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, willChange: 'transform', backfaceVisibility: 'hidden' }} />
    <img ref={nutRefs.sunflowershell} className="absolute aspect-[0.67] object-cover" alt="Product" src={productConfig.images.sunflowershell} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, willChange: 'transform', backfaceVisibility: 'hidden' }} />
    <img ref={nutRefs.sunflowerseed2} className="absolute aspect-[0.67] object-cover" alt="Product" src={productConfig.images.sunflowerseed2} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, willChange: 'transform', backfaceVisibility: 'hidden' }} />
    <img ref={nutRefs.pumpkinseed2} className="absolute aspect-[0.67] object-cover" alt="Product" src={productConfig.images.pumpkinseed2} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, willChange: 'transform', backfaceVisibility: 'hidden' }} />

    {/* Second Section Heading - Below grouped nuts and dates */}
    <div 
      className="absolute [font-family:'Permanent_Marker-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]" 
      style={{ 
        zIndex: 10,
        bottom: breakpoint === 'mobile' ? '6%' : breakpoint === 'tablet' ? '6%' : '6%',
        right: breakpoint === 'mobile' ? '16px' : breakpoint === 'tablet' ? '50px' : '12%',
        width: breakpoint === 'mobile' ? '352px' : breakpoint === 'tablet' ? 'calc(100% - 100px)' : '520px',
        fontSize: breakpoint === 'mobile' ? '24px' : breakpoint === 'tablet' ? '36px' : '54px',
        lineHeight: '1.05',
        textAlign: breakpoint === 'mobile' || breakpoint === 'tablet' ? 'left' : 'left',
      }}
    >
      {productConfig.heading2}
    </div>

    {/* Second Section Paragraph */}
    <p 
      className="absolute [font-family:'Just_Me_Again_Down_Here-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]" 
      style={{ 
        zIndex: 10,
        bottom: breakpoint === 'mobile' ? 'calc(6% - 100px)' : breakpoint === 'tablet' ? 'calc(6% - 100px)' : 'calc(6% - 500px)',
        right: breakpoint === 'mobile' ? '16px' : breakpoint === 'tablet' ? '50px' : '12%',
        width: breakpoint === 'mobile' ? '352px' : breakpoint === 'tablet' ? 'calc(100% - 100px)' : '520px',
        fontSize: breakpoint === 'mobile' ? '14px' : breakpoint === 'tablet' ? '18px' : '22px',
        lineHeight: '1.1',
        marginTop: '12px',
        textAlign: breakpoint === 'mobile' || breakpoint === 'tablet' ? 'left' : 'left',
      }}
    >
      {productConfig.paragraph2}
    </p>

    {/* Check Details Button */}
    {onOpenDetails && (
      <button
        onClick={onOpenDetails}
        style={{
          position: 'absolute',
          zIndex: 10,
          bottom: breakpoint === 'mobile' ? 'calc(6% - 180px)' : breakpoint === 'tablet' ? 'calc(6% - 180px)' : 'calc(6% - 600px)',
          right: breakpoint === 'mobile' ? '16px' : breakpoint === 'tablet' ? '50px' : '12%',
          padding: breakpoint === 'mobile' ? '10px 20px' : breakpoint === 'tablet' ? '12px 24px' : '14px 28px',
          fontFamily: "'Permanent_Marker-Regular', Helvetica",
          fontSize: breakpoint === 'mobile' ? '18px' : breakpoint === 'tablet' ? '20px' : '22px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#333';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#000';
          e.target.style.transform = 'scale(1)';
        }}
      >
        Check Details
      </button>
    )}

    {/* Date Image */}
    <img ref={nutRefs.date} className="absolute aspect-[0.67] object-cover" alt="Product" src={productConfig.images.date} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, willChange: 'transform', backfaceVisibility: 'hidden' }} />

    {/* Vector Background - Covers entire banner initially */}
    <img
      ref={vectorRef}
      className="absolute"
      alt="Vector"
      src={productConfig.vector}
      loading="eager"
      decoding="async"
      style={{ 
        top: '-600px', 
        left: '400px', 
        width: breakpoint === 'mobile' ? '100%' : breakpoint === 'tablet' ? '100%' : '1698px', 
        height: breakpoint === 'mobile' ? '100%' : breakpoint === 'tablet' ? '100%' : '2946px',
        objectFit: 'cover',
        zIndex: 1,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        // opacity: breakpoint === 'mobile' || breakpoint === 'tablet' ? 0.6 : 1,
      }}
    />

    {/* Wallnut Center */}
    <img ref={nutRefs.wallnutCenter} className="absolute aspect-[0.67] object-cover" alt="Product" src={productConfig.images.wallnutCenter} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, willChange: 'transform', backfaceVisibility: 'hidden' }} />
  </>
);

export default NutsLayout;

