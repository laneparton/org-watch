$app.rootCmd.addCommand(new Command({
    use: "fetch-data",
    run: (cmd, args) => {
        const config = require(`${__hooks}/config.json`)
        const { tickers } = require(`${__hooks}/companies.json`)

        // 1. https://financialmodelingprep.com/api/v3/search-ticker?query=MSFT&exchange=NASDAQ&apikey=
        tickers.forEach(ticker => {
            try {
                const res = $http.send({
                    url:     `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${config.FMP_KEY}`,
                    method:  "GET",
                    body:    "",
                    headers: {"content-type": "application/json"},
                    timeout: 120,
                })

                if (res.statusCode == 200) {
                    const json = res.json[0] // Assume we're getting the only matching ticker

                    // Make sure we're not saving an empty record
                    if(json) {
                        const collection = $app.dao().findCollectionByNameOrId("companies")

                        const record = new Record(collection, {
                            ticker: json.symbol,
                            name: json.companyName,
                            description: json.description,
                            marketCap: json.mktCap,
                            fullTimeEmployees: json.fullTimeEmployees,
                            website: json.website
                        })

                        $app.dao().saveRecord(record)
                    }
                }
            } catch (err) {
                console.log("request failed", err);
            }
        })
    },
}))