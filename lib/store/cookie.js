    /**
     *Cookie 兼容版本
     * @param {键*string} key
     * @param {值*string} value
     * @param {Set Cookie [ expires path domain secure ]* Object} options
     * @returns
     */
    function Cookie(key, value, options) {
        // Write  
        var d, cookies, cookie, index;
        if (arguments.length > 1) {
            typeof options === "object" ? "" : options = {};
            return document.cookie = [
                key + "=" + value,
                options.expires ? "; expires=" +
                ((d = new Date())
                    .setDate(
                        d.getDate() + (isNaN(Number(options.expires)) ? 0 : options.expires)
                    ) && d) :
                "",
                options.path ? "; path=" + options.path : "",
                options.domain ? "; domain=" + options.domain : "",
                options.secure ? "; secure" : ""
            ].join("");
        }
        //Read
        for (cookies = document.cookie.split(" ;"), index = 0; cookies[index]; index++) {
            cookie = cookies[index].split("=");
            if (cookie[0] === key) return cookie[1];
        }
    }

    function removeCookie(key, path) {
        return this.Cookie(key, "", {
            path: (path ? path : ""),
            expires: -1
        })
    }