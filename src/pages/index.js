import React, { useRef } from "react"
//import { Link } from "gatsby"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"

import Layout from "../components/layout"
import SEO from "../components/seo"

const url = (name, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`

const IndexPage = () => {
  const parallax = useRef(null)
  return (
    <Layout>
      <SEO title="Home" />
      <Parallax ref={parallax} pages={3}>
        {/*ZVIJEZDANO NEBO OFSET 0 (NULTA STRANICA) POCETAK
        FACTOR 3 MOZDA 3 PUTA VECA OD VIEWPORTA*/}
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: url("stars", true),
            backgroundSize: "cover",
          }}
        />
        {/*ROZI SEGMANT, AKO BI SMO STAVILI FACTOR 2 DOBILI BI SPOJENE ROZI I PLAVI */}
        <ParallaxLayer
          offset={1}
          speed={1}
          factor={1}
          style={{ backgroundColor: "#805E73" }}
        ></ParallaxLayer>
        {/*SVIJETLO PLAVI SEGMENT*/}
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{ backgroundColor: "#87BCDE" }}
        />

        <ParallaxLayer
          offset={1.3}
          speed={-0.3}
          style={{ pointerEvents: "none" }}
        >
          <img
            alt="kurec palec"
            src={url("satellite4")}
            style={{ width: "15%", marginLeft: "70%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "55%" }}
          />
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "15%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "70%" }}
          />
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "40%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "10%" }}
          />
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "75%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "60%" }}
          />
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "25%", marginLeft: "30%" }}
          />
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "80%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "5%" }}
          />
          <img
            alt="kurec palec"
            src={url("cloud")}
            style={{ display: "block", width: "15%", marginLeft: "75%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={-0.4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <img alt="kurec palec" src={url("earth")} style={{ width: "60%" }} />
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundImage: url("clients", true),
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img alt="kurec palec" src={url("server")} style={{ width: "20%" }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img alt="kurec palec" src={url("bash")} style={{ width: "40%" }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => parallax.current.scrollTo(0)}
        >
          <img
            alt="kurec palec"
            src={url("clients-main")}
            style={{ width: "40%" }}
          />
        </ParallaxLayer>
      </Parallax>
    </Layout>
  )
}

export default IndexPage
