import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCamera,
    faCheckSquare, faSquare,
    faSpinner, faCircleNotch, faSync, faCog, faStroopwafel,
    faQuoteLeft, faArrowRight,
    faSkating, faSkiing, faSkiingNordic, faSnowboarding, faSnowplow

} from '@fortawesome/free-solid-svg-icons'

import './Example-fontAwesome.css'

const ICONS = [faSkating, faSkiing, faSkiingNordic, faSnowboarding, faSnowplow]

const SIZES = ["xs", "sm", "lg", "2x", "3x", "5x", "7x", "10x"]

const colorObj = {
    red: {
        color: "red"
    }
}

const FontAwesome = () => (
    <div className="container">

        <h1>FontAwesome Examples</h1>
        <hr />

        <h2>Font Awesome using all.css</h2>

        <section>
            &nbsp;
            <i className="fa fa-lock"></i> lock
            &nbsp;
            <i className="fa fa-address-card"></i> address-card
            &nbsp;
            <i className="fab fa-android"></i> android
            &nbsp;
            <i className="fas fa-mosque" style={colorObj.red}></i> mosque
        </section>

        <hr />

        <h2>Font Awesome using Components</h2>

        <section>
            <h3>Sizing Icons</h3>
            {SIZES.map(size => (
                <span key={size}>
                    <FontAwesomeIcon icon={faCamera} size={size} style={colorObj.red} />
                    &nbsp;
                </span>
            ))}
        </section>

        <section>
            <h3>Animating Icons</h3>
            <div className="fa-3x">
                <FontAwesomeIcon icon={faSpinner} spin style={{ color: "green" }} />
                &nbsp;
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                &nbsp;
                    <FontAwesomeIcon icon={faSync} spin />
                &nbsp;
                    <FontAwesomeIcon icon={faCog} spin />
                &nbsp;
                    <FontAwesomeIcon icon={faSpinner} pulse />
                &nbsp;
                    <FontAwesomeIcon icon={faStroopwafel} spin />
            </div>
        </section>

        <section>
            <h3>Bordered + Pulled Icons</h3>
            <div>
                <FontAwesomeIcon icon={faQuoteLeft} size="2x" pull="left" />
                Gatsby believed in the green light, the orgastic future that year by
                year recedes before us. It eluded us then, but that’s no matter —
                tomorrow we will run faster, stretch our arms further... And one fine
                morning — So we beat on, boats against the current, borne back
                ceaselessly into the past.
            </div>
            <br />
            <div>
                <FontAwesomeIcon icon={faArrowRight} size="2x" pull="right" border />
                Gatsby believed in the green light, the orgastic future that year by
                year recedes before us. It eluded us then, but that’s no matter —
                tomorrow we will run faster, stretch our arms further... And one fine
                morning — So we beat on, boats against the current, borne back
                ceaselessly into the past.
                </div>
        </section>

        <section>
            <h3>Fixed Width Icons</h3>
            <div style={{ fontSize: "2rem" }}>
                {ICONS.map((icon, i) => (
                    <div key={i}>
                        <FontAwesomeIcon icon={icon} fixedWidth /> {icon.iconName}
                    </div>
                ))}
            </div>
        </section>

        <section>
            <h3>Icons in a list</h3>
            <ul className="fa-ul">
                <li>
                    <FontAwesomeIcon icon={faCheckSquare} listItem />
                    List icons can
                </li>
                <li>
                    <FontAwesomeIcon icon={faCheckSquare} listItem />
                    be used to
                </li>
                <li>
                    <FontAwesomeIcon icon={faSpinner} listItem spin />
                    replace bullets
                </li>
                <li>
                    <FontAwesomeIcon icon={faSquare} listItem />
                    in lists
                </li>
            </ul>
        </section>


    </div>
)

export default FontAwesome;