function slugify(input) {
    if (!input)
        return '';

    // make lower case and trim
    var slug = input.toLowerCase().trim();

    // remove accents from charaters
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // replace invalid chars with spaces
    slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();

    // replace multiple spaces or hyphens with a single hyphen
    slug = slug.replace(/[\s-]+/g, '-');

    return slug;
}

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
                            slug: slugify(json.companyName),
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