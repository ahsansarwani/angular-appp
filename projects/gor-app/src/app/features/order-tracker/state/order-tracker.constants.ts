export const ORDER_TRACKER_URLS = {
  GET_TOKEN: "/api/get-order-service/oauth/token",
  GET_ORDER_HISTORY: "/api/get-order-service/order/order-history"
}

export const PLANS = {
  PLAN_599: 'GPLAN PLUS SIM-ONLY 599',
  PLAN_799: 'GPLAN PLUS SIM-ONLY 799',
  PLAN_999: 'GPLAN PLUS SIM-ONLY 999'
};

export const ORDER_STATUS  = {
  ORDER_CONFIRMED: "ORDER CONFIRMED",
  DELIVERY: "OUT FOR DELIVERY",
  CANCELLED: "CANCELLED",
  SIM_ACTIVATED: "SIM ACTIVATED"
};

export const ORDER_STATUS_MAPPING = {
  "ORDER CONFIRMED": {
    header: "Order confirmed",
    details: "Your order is confirmed and being processed.",
    icon: "../../../../../assets/order-tracker/confirmed.svg"
  },
  "OUT FOR DELIVERY": {
    header: "Out for delivery",
    details: "Your delivery is on the way! Please expect our delivery partner to get in touch with you soon.",
    icon: "../../../../../assets/order-tracker/delivery.svg"
  },
  "CANCELLED": {
    header: "Cancelled",
    details: "Your order was cancelled. You may check back to Globe Online again. ",
    icon: "../../../../../assets/order-tracker/cancelled.svg"
  },
  "SIM ACTIVATED": {
    header: "SIM Activated",
    details: "Your order was successfully completed!",
    icon: "../../../../../assets/order-tracker/sim-activated.svg"
  }
}

export const PLAN_599_DETAILS = {
  planName: "GPlan with SIM Only 599",
  planIcon: "../../../../../assets/order-tracker/plan599.svg",
  planLabel: "Best Value",
  planInclusion: [
    {
      icon: "../../../../../assets/order-tracker/wifi.svg",
      label: "6GB ALL- ACCESS DATA",
      desc: "The Starter Plan helps you stay connected when it matters!"
    },
    {
      icon: "../../../../../assets/order-tracker/music.svg",
      label: "50 Hours of music streaming",
      desc: "or stay connected with your friends at work, at home, and everywhere in between. Keep up-to-date, even while on the go"
    },
    {
      icon: "../../../../../assets/order-tracker/router.svg",
      label: "3GB GOWIFI ACCESS",
      desc: "Connect to over 3,100 convenient locations, such as malls, restos, and transport hubs."
    },
    {
      icon: "../../../../../assets/order-tracker/call-text.svg",
      label: "100 All-net Call minutes and Texts",
      desc: "Stay connected using Call or Text when it matters."
    }
  ]
};

export const PLAN_799_DETAILS = {
  planName: "GPlan with SIM Only 799",
  planIcon: "../../../../../assets/order-tracker/plan799.svg",
  planLabel: "Student Plan",
  planInclusion: [
    {
      icon: "../../../../../assets/order-tracker/wifi.svg",
      label: "10GB ALL- ACCESS DATA",
      desc: "Stay connected on the go, whether you’re travelling or just need an extra boost of data for your regular routine."
    },
    {
      icon: "../../../../../assets/order-tracker/music.svg",
      label: "1,500 Songs",
      desc: "or view up to 1,500 social media profiles or web pages!"
    },
    {
      icon: "../../../../../assets/order-tracker/router.svg",
      label: "3GB GOWIFI ACCESS",
      desc: "Connect to over 3,100 convenient locations, such as malls, restos, and transport hubs."
    },
    {
      icon: "../../../../../assets/order-tracker/call-text.svg",
      label: "Unli Call and Text to all networks",
      desc: "Stay connected using Call or Text when it matters."
    }
  ]
};

export const PLAN_999_DETAILS = {
  planName: "GPlan with SIM Only 999",
  planIcon: "../../../../../assets/order-tracker/plan999.svg",
  planLabel: "Stay Connected",
  planInclusion: [
    {
      icon: "../../../../../assets/order-tracker/wifi.svg",
      label: "20GB ALL- ACCESS DATA",
      desc: "Get through your day with a plan that packs a bit more oomph!"
    },
    {
      icon: "../../../../../assets/order-tracker/music.svg",
      label: "100 hours of music",
      desc: "or Stream up to 20 hours worth of standard definition Netflix. The Basic Plan lets you do all that and more."
    },
    {
      icon: "../../../../../assets/order-tracker/router.svg",
      label: "3GB GOWIFI ACCESS",
      desc: "Connect to over 3,100 convenient locations, such as malls, restos, and transport hubs."
    },
    {
      icon: "../../../../../assets/order-tracker/call-text.svg",
      label: "Unli Call and Text to all networks",
      desc: "Stay connected using Call or Text when it matters."
    },
    {
      icon: "../../../../../assets/order-tracker/app.svg",
      label: "Unli 1 app for 6 months (free data access)",
      desc: "Enjoy unlimited data access to 1 app for 6 months!"
    }
  ]
};

export const STEPS_CONTENT = [
  {
    status: "ORDER CONFIRMED",
    title: "Order confirmed",
    icon: "../../assets/order-tracker/step-success.svg",
  },
  {
    status: "OUT FOR DELIVERY",
    title: "Out for delivery",
    icon: "../../assets/order-tracker/step-delivery.svg",
  },
  {
    status: "SIM ACTIVATED",
    title: "SIM Activated",
    icon: "../../assets/order-tracker/step-sim.svg",
  },
  {
    status: "DOWNLOAD NEW GLOBE ONE APP",
    title: "Download New\nGlobeOne App",
    icon: "../../assets/order-tracker/step-download.svg",
  }
];

export const STEPS_CONTENT_CANCELLED = [
  {
    status: "ORDER CONFIRMED",
    title: "Order confirmed",
    icon: "../../assets/order-tracker/step-success.svg",
  },
  {
    status: "OUT FOR DELIVERY",
    title: "Out for delivery",
    icon: "../../assets/order-tracker/step-delivery.svg",
  },
  {
    status: "CANCELLED",
    title: "Cancelled",
    icon: ".../../assets/order-tracker/step-cancelled.svg",
  },
];

export const ERROR_CODES = {
  INVALID_TOKEN: '40102',
  EXPIRED_TOKEN: '40103'
};