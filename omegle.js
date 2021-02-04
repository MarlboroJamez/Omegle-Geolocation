const apiKey = "your api";

window.oRTCPeerConnection = 
    window.oRTCPeerConnection || window.RTCPeerConnection;

    window.RTCPeerConnection = function (...args) {
        const pc = new window.oRTCPeerConnection(...args);

        pc.oaddIceCabdidate = pc.addIceCandidate;

        pc.addIceCandidate = function (iceCandidate, ...rest) {
            const fields = iceCandidate.candidate.candidate.split(" ");
            const ip = fields[4];
            if (fields[7] === "srflx") {
                getLocation(ip);
            }
            return pc.oaddIceCabdidate(iceCandidate, ...rest);
        };
        return pc;
    };

    const getlocation = async (ip) => {
        let url = 'https://api.geolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}';

        await fetch(url).then((response) =>
        response.json().then((json) => {
            const output = `
                -------------------------------------------
                Country: ${json.country_name}
                State: ${json.state_prov}
                City: ${json.city}
                District: ${json.district}
                Lat / Long: (${json.latitude}, ${json.longitude})
                -------------------------------------------
            `;
            console.log(output);
        })
      );
    };
