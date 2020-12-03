const Duck = ({ color = '#efff00', width = '50' }) => {
  let stroke = '5px';
  if (width > 200) stroke = '3px';
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249 297.02" width=${width}>
        <defs>
            <style>.cls-2{fill:#212121;}.cls-3{fill:#efefef;}.cls-4{fill:#ff6700;}.cls-5{fill:none;stroke:#111;}</style>
        </defs>
        <g id="레이어_2" data-name="레이어 2">
            <g id="레이어_1-2" data-name="레이어 1">
            <path class="cls-1" style="fill:${color};stroke:#121212;stroke-miterlimit:10;stroke-width:${stroke};" d="M247,199c-4.59-19.27-17.65-42.82-27-41.53a95,95,0,0,0-31.71-29.94c14.1-13.44,22.71-31.33,22.71-51,0-41.7-38.73-75.5-86.5-75.5s-86.5,33.8-86.5,75.5c0,19.67,8.62,37.58,22.74,51a99.18,99.18,0,0,0-32.11,29.94c-9.33-.39-22,22.66-26.51,41.57-2.85,12,.46,25.17,5.62,34.09,3.07,48.61,46.88,63.47,117.26,62.89,74.74-.61,108.78-14.26,113.53-58.66C245.13,228.81,250.31,213.07,247,199Z"/>
            <ellipse class="cls-2" cx="175.56" cy="62.31" rx="11.04" ry="14.31" transform="translate(-9.78 43.48) rotate(-13.74)"/>
            <ellipse class="cls-3" cx="172.43" cy="58.5" rx="3" ry="4"/><ellipse class="cls-2" cx="78.56" cy="61.31" rx="14.31" ry="11.04" transform="translate(0.34 123.06) rotate(-76.26)"/>
            <ellipse class="cls-3" cx="81.69" cy="57.5" rx="3" ry="4"/><path class="cls-4" d="M123.43,76.5c-7.32-.25-14.5,7.75-21,15-2,2.17-3.66,4.35-7,6-5.3,2.62-9.25,1.22-10,3-1,2.36,4.66,7.81,11,11,5.84,3,11,3.3,21,4a97.2,97.2,0,0,0,17,0c10.55-1,16.59-3.42,18-4,1.26-.53,11.57-4.8,11-8-.3-1.65-3.39-2.54-5-3-3.81-1.09-5.33.08-8-1-2.15-.86-3-2.35-5-5a99.51,99.51,0,0,0-9-10C132.35,80.55,128.35,76.67,123.43,76.5Z"/>
            <path class="cls-5" style="stroke-miterlimit:10;stroke-width:${stroke};" d="M12.43,236.5c38.61-7.49,18.88-74.1,20-71"/>
            <path class="cls-5" style="stroke-miterlimit:10;stroke-width:${stroke};" d="M231.48,236.5c-38.61-7.49-18.87-74.1-20-71"/>
            </g>
        </g>
    </svg>
    `;
};

export const DuckHat = ({ width = '40' }) => {
  return `
    <svg class="duck-hat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155 110.58" width=${width}>
        <defs>
        <style>
        .cls-a{fill:#cbd467;stroke:#000;}.cls-a,.cls-d{stroke-miterlimit:10;stroke-width:3px;}.cls-b{fill:#201c1d;}.cls-c{fill:#df8e14;}.cls-d{fill:#f3f2f9;stroke:#161616;}.cls-e{fill:none;}</style>
        </defs>
        <g id="레이어_2" data-name="레이어 2"><g id="레이어_1-2" data-name="레이어 1"><path class="cls-a" d="M151.1,64.73a22.57,22.57,0,0,0-3.47-8.6,28.1,28.1,0,0,0-8.1-7.6c-2.68-1.78-3.86-2-10-5.62-1.73-1-3-1.8-3.58-2.15-.21-.59-.43-1.19-.66-1.82-2.67-7.33-4.46-12.26-9.64-17.52a45.41,45.41,0,0,0-15.43-9.92A57,57,0,0,0,80.91,7.2a55.55,55.55,0,0,0-24.69,5c-7,3.07-16.63,7.23-20.44,15.54-2.33,5.09-2,10.59-7.71,17.19a9.58,9.58,0,0,0-1.81,2.28c-3.44.63-8.81,2-12.08,6s-2.88,8.67-2.7,10.57c.38,3.8,2.25,10.13,12.35,18.19,4.09,3.26,17.91,13.5,43.58,17.85,7.89,1.34,36.27,5.4,63.25-6,15.7-6.6,18.82-13.34,19.67-15.54C152.59,72.37,151.27,65.55,151.1,64.73Z"/><path class="cls-b" d="M129.11,51.17c-11.77,5.26-29.9,20.57-49.75,21.16-9.28.27-19.75.47-30.47-4.63-4.28-2-8-5.11-15.42-11.24-6-5-8.1-7.46-7.72-10.25.29-2,1.91-4.5,4.25-5,3.28-.63,5.14,3.27,12.34,7.94,3.23,2.09,7.29,3.82,15.43,7.27,5.57,2.37,8.35,3.55,10.79,4.3,13.89,4.27,28.31,0,33.94-1.65,14.65-4.33,22.56-16.15,27-16.2C135,42.84,134.34,44.79,129.11,51.17Z"/><path class="cls-c" d="M138.76,48.2c-4.82.12-5.09,10-12.35,17.85-5.82,6.32-13.34,8.3-27,11.9-16.54,4.36-24.63,3-42.43,9.26-7.68,2.72-9.25,4.8-9,6.37.32,1.93,4,2.73,6,3,9.07,1.22,24.62.38,57.76-14.33,5.86-2.6,17.61-8,27-17.85,5-5.22,6.58-8.86,5.4-11.91C143.37,50.49,141.14,48.14,138.76,48.2Z"/><path class="cls-d" d="M9,7.25c-.29-.8-.42-1.58-1-1.7C6.54,5.25,2.7,9.27,3,13.18c.39,4.9,7.11,7.28,5.93,10.18-.57,1.41-2.25,1.09-3.29,2.83-1.51,2.5.25,6.1,2,8.19C11,38.49,15.76,38.69,16.21,42c.13,1-.25,1.08-.33,2.26C15.59,48.47,20,52,22.15,53.61c3,2.35,7.28,3.83,15.82,6.78,3.82,1.32,5.88,1.89,8.58,1.7,1.08-.08,5.8-.41,7.91-3.39a6,6,0,0,0,1-4c-.15-4.05-2.3-7.45-5.93-11.87A73.41,73.41,0,0,0,37.64,30.71c-4.8-3.85-5-3-11.21-7.92-7.16-5.6-5.57-5.62-10.22-8.76C13,11.9,10.12,10.43,9,7.25Z"/><polyline class="cls-4" points="8.79 23.4 13.58 25.96 29.23 39.6"/><path class="cls-4" d="M15.73,39.93A65.25,65.25,0,0,1,33.08,53.16c2,2.15-3.3-3.66-1.93-1.66"/><rect class="cls-e" width="155" height="110.58" rx="12"/></g></g>
    </svg>`;
};

export default Duck;
