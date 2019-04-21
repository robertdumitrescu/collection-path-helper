let data = {
    'web-app': {
        servlet: [
            {
                'servlet-name': 'cofaxCDS',
                tweets: [{
                    created_at: 'Thu Jun 22 21:00:00 +0000 2017',
                    id: 877994604561387500,
                    id_str: '877994604561387520',
                    text: 'Creating a Grocery List Manager Using Angular, Part 1: Add &amp; Display Items https://t.co/xFox78juL1 #Angular',
                    truncated: false,
                    entities: {
                        hashtags: [{
                            text: 'Angular',
                            indices: [103, 111]
                        }],
                        symbols: [],
                        user_mentions: [],
                        urls: [{
                            url: 'https://t.co/xFox78juL1',
                            expanded_url: 'http://buff.ly/2sr60pf',
                            display_url: 'buff.ly/2sr60pf',
                            indices: [79, 102]
                        }]
                    },
                    source: '<a href="http://bufferapp.com" rel="nofollow">Buffer</a>',
                    user: {
                        id: 772682964,
                        id_str: '772682964',
                        name: 'SitePoint JavaScript',
                        screen_name: 'SitePointJS',
                        location: 'Melbourne, Australia',
                        description: 'Keep up with JavaScript tutorials, tips, tricks and articles at SitePoint.',
                        url: 'http://t.co/cCH13gqeUK',
                        entities: {
                            url: {
                                urls: [{
                                    url: 'http://t.co/cCH13gqeUK',
                                    expanded_url: 'http://sitepoint.com/javascript',
                                    display_url: 'sitepoint.com/javascript',
                                    indices: [0, 22]
                                }]
                            },
                            description: {
                                urls: []
                            }
                        },
                        protected: false,
                        followers_count: 2145,
                        friends_count: 18,
                        listed_count: 328,
                        created_at: 'Wed Aug 22 02:06:33 +0000 2012',
                        favourites_count: 57,
                        utc_offset: 43200,
                        time_zone: 'Wellington',
                    },
                }],
                'servlet-class': 'org.cofax.cds.CDSServlet',
                'init-param': {
                    'configGlossary:installationAt': 'Philadelphia, PA',
                    'configGlossary:adminEmail': 'ksm@pobox.com',
                    'configGlossary:poweredBy': 'Cofax',
                    'configGlossary:poweredByIcon': '/images/cofax.gif',
                    'configGlossary:staticPath': '/content/static',
                    templateProcessorClass: 'org.cofax.WysiwygTemplate',
                    templateLoaderClass: 'org.cofax.FilesTemplateLoader',
                    templatePath: 'templates',
                    templateOverridePath: '',
                    defaultListTemplate: 'listTemplate.htm',
                    defaultFileTemplate: 'articleTemplate.htm',
                    useJSP: false,
                    jspListTemplate: 'listTemplate.jsp',
                    jspFileTemplate: 'articleTemplate.jsp',
                    cachePackageTagsTrack: 200,
                    cachePackageTagsStore: 200,
                    cachePackageTagsRefresh: 60,
                    cacheTemplatesTrack: 100,
                    cacheTemplatesStore: 50,
                    cacheTemplatesRefresh: 15,
                    cachePagesTrack: 200,
                    cachePagesStore: 100,
                    cachePagesRefresh: 10,
                    markers: [
                        {
                            name: 'Rixos The Palm Dubai',
                            position: [25.1212, 55.1535],
                        },
                        {
                            name: 'Shangri-La Hotel',
                            location: [25.2084, 55.2719]
                        },
                        {
                            name: 'Grand Hyatt',
                            location: [25.2285, 55.3273]
                        }
                    ],
                    markStates: {
                        mark1: [
                            {
                                name: 'Rixos The Palm Dubai2',
                                position: [25.1212, 55.1535],
                            },
                            {
                                name: 'Shangri-La Hotel2',
                                location: [25.2084, 55.2719]
                            },
                            {
                                name: 'Grand Hyatt2',
                                location: [25.2285, 55.3273]
                            }
                        ],
                        mark2: [
                            {
                                name: 'Rixos The Palm Dubai3',
                                position: [25.1212, 55.1535],
                            },
                            {
                                name: 'Shangri-La Hotel3',
                                location: [25.2084, 55.2719]
                            },
                            {
                                name: 'Grand Hyatt3',
                                location: [25.2285, 55.3273]
                            }
                        ],
                    },
                    cachePagesDirtyRead: 10,
                    searchEngineListTemplate: 'forSearchEnginesList.htm',
                    searchEngineFileTemplate: 'forSearchEngines.htm',
                    searchEngineRobotsDb: 'WEB-INF/robots.db',
                    useDataStore: true,
                    dataStoreClass: 'org.cofax.SqlDataStore',
                    redirectionClass: 'org.cofax.SqlRedirection',
                    dataStoreName: 'cofax',
                    dataStoreDriver: 'com.microsoft.jdbc.sqlserver.SQLServerDriver',
                    dataStoreUrl: 'jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon',
                    dataStoreUser: 'sa',
                    dataStorePassword: 'dataStoreTestQuery',
                    dataStoreTestQuery: "SET NOCOUNT ON;select test='test';",
                    dataStoreLogFile: '/usr/local/tomcat/logs/datastore.log',
                    dataStoreInitConns: 10,
                    dataStoreMaxConns: 100,
                    dataStoreConnUsageLimit: 100,
                    dataStoreLogLevel: 'debug',
                    maxUrlLength: 500
                }
            },
            {
                'servlet-name': 'cofaxEmail',
                'servlet-class': 'org.cofax.cds.EmailServlet',
                'init-param': {
                    mailHost: 'mail1',
                    mailHostOverride: 'mail2',
                    markers: [
                        {
                            name: 'Rixos The Palm Dubai4',
                            position: [25.1212, 55.1535],
                        },
                        {
                            name: 'Shangri-La Hotel4',
                            location: [25.2084, 55.2719]
                        },
                        {
                            name: 'Grand Hyatt4',
                            location: [25.2285, 55.3273]
                        }
                    ],
                    markStates: {
                        mark1: [
                            {
                                name: 'Rixos The Palm Dubai5',
                                position: [25.1212, 55.1535],
                            },
                            {
                                name: 'Shangri-La Hotel5',
                                location: [25.2084, 55.2719]
                            },
                            {
                                name: 'Grand Hyatt5',
                                location: [25.2285, 55.3273]
                            }
                        ],
                        mark2: [
                            {
                                name: 'Rixos The Palm Dubai6',
                                position: [25.1212, 55.1535],
                            },
                            {
                                name: 'Shangri-La Hotel6',
                                location: [25.2084, 55.2719]
                            },
                            {
                                name: 'Grand Hyatt6',
                                location: [25.2285, 55.3273]
                            }
                        ],
                    },
                }
            },
            {
                'servlet-name': 'cofaxAdmin',
                'servlet-class': 'org.cofax.cds.AdminServlet'
            },

            {
                'servlet-name': 'fileServlet',
                'servlet-class': 'org.cofax.cds.FileServlet'
            },
            {
                'servlet-name': 'cofaxTools',
                'servlet-class': 'org.cofax.cms.CofaxToolsServlet',
                'init-param': {
                    templatePath: 'toolstemplates/',
                    log: 1,
                    logLocation: '/usr/local/tomcat/logs/CofaxTools.log',
                    logMaxSize: '',
                    dataLog: 1,
                    dataLogLocation: '/usr/local/tomcat/logs/dataLog.log',
                    dataLogMaxSize: '',
                    removePageCache: '/content/admin/remove?cache=pages&id=',
                    removeTemplateCache: '/content/admin/remove?cache=templates&id=',
                    fileTransferFolder: '/usr/local/tomcat/webapps/content/fileTransferFolder',
                    lookInContext: 1,
                    adminGroupID: 4,
                    betaServer: true
                }
            }
        ],
        'servlet-mapping': {
            cofaxCDS: '/',
            cofaxEmail: '/cofaxutil/aemail/*',
            cofaxAdmin: '/admin/*',
            fileServlet: '/static/*',
            cofaxTools: '/tools/*',
            products: [{
                _id: {
                    $oid: '5968dd23fc13ae04d9000001'
                },
                product_name: 'sildenafil citrate',
                supplier: 'Wisozk Inc',
                quantity: 261,
                youtube_page: {
                    kind: 'youtube#searchListResponse',
                    etag: '"m2yskBQFythfE4irbTIeOgYYfBU/PaiEDiVxOyCWelLPuuwa9LKz3Gk"',
                    nextPageToken: 'CAUQAA',
                    regionCode: 'KE',
                    pageInfo: {
                        totalResults: 4249,
                        resultsPerPage: 5
                    },
                    items: [
                        {
                            kind: 'youtube#searchResult',
                            etag: '"m2yskBQFythfE4irbTIeOgYYfBU/QpOIr3QKlV5EUlzfFcVvDiJT0hw"',
                            id: {
                                kind: 'youtube#channel',
                                channelId: 'UCJowOS1R0FnhipXVqEnYU1A'
                            }
                        },
                        {
                            kind: 'youtube#searchResult',
                            etag: '"m2yskBQFythfE4irbTIeOgYYfBU/AWutzVOt_5p1iLVifyBdfoSTf9E"',
                            id: {
                                kind: 'youtube#video',
                                videoId: 'Eqa2nAAhHN0'
                            }
                        },
                        {
                            kind: 'youtube#searchResult',
                            etag: '"m2yskBQFythfE4irbTIeOgYYfBU/2dIR9BTfr7QphpBuY3hPU-h5u-4"',
                            id: {
                                kind: 'youtube#video',
                                videoId: 'IirngItQuVs'
                            }
                        }
                    ]
                },
                unit_cost: '$10.47'
            }, {
                _id: {
                    $oid: '5968dd23fc13ae04d9000002'
                },
                product_name: 'Mountain Juniperus ashei',
                supplier: 'Keebler-Hilpert',
                quantity: 292,
                unit_cost: '$8.74'
            }, {
                _id: {
                    $oid: '5968dd23fc13ae04d9000003'
                },
                product_name: 'Dextromathorphan HBr',
                supplier: 'Schmitt-Weissnat',
                quantity: 211,
                youtube_page: {
                    kind: 'youtube#searchListResponse',
                    etag: '"m2yskBQFythfE4irbTIeOgYYfBU/PaiEDiVxOyCWelLPuuwa9LKz3Gk"',
                    nextPageToken: 'CAUQAA',
                    regionCode: 'KE',
                    pageInfo: {
                        totalResults: 4249,
                        resultsPerPage: 5
                    },
                    items: [
                        {
                            kind: 'youtube#searchResult',
                            etag: '"m2yskBQFythfE4irbTIeOgYYfBU/QpOIr3QKlV5EUlzfFcVvDiJT0hw"',
                            id: {
                                kind: 'youtube#channel',
                                channelId: 'UCJowOS1R0FnhipXVqEnYU1A'
                            }
                        },
                        {
                            kind: 'youtube#searchResult',
                            etag: '"m2yskBQFythfE4irbTIeOgYYfBU/AWutzVOt_5p1iLVifyBdfoSTf9E"',
                            id: {
                                kind: 'youtube#video',
                                videoId: 'Eqa2nAAhHN0'
                            }
                        },
                        {
                            kind: 'youtube#searchResult',
                            etag: '"m2yskBQFythfE4irbTIeOgYYfBU/2dIR9BTfr7QphpBuY3hPU-h5u-4"',
                            id: {
                                kind: 'youtube#video',
                                videoId: 'IirngItQuVs'
                            }
                        }
                    ]
                },
                unit_cost: '$20.53'
            }]
        },

        taglib: {
            'taglib-uri': 'cofax.tld',
            'taglib-location': '/WEB-INF/tlds/cofax.tld'
        }
    },
    colors: [
        {
            color: 'black',
            category: 'hue',
            type: 'primary',
            code: {
                rgba: [255, 255, 255, 1],
                hex: '#000'
            }
        },
        {
            color: 'white',
            category: 'value',
            code: {
                rgba: [0, 0, 0, 1],
                hex: '#FFF'
            }
        },
        {
            color: 'red',
            category: 'hue',
            type: 'primary',
            code: {
                rgba: [255, 0, 0, 1],
                hex: '#FF0'
            }
        },
        {
            color: 'blue',
            category: 'hue',
            type: 'primary',
            code: {
                rgba: [0, 0, 255, 1],
                hex: '#00F'
            }
        },
        {
            color: 'yellow',
            category: 'hue',
            type: 'primary',
            code: {
                rgba: [255, 255, 0, 1],
                hex: '#FF0'
            }
        },
        {
            color: 'green',
            category: 'hue',
            type: 'secondary',
            code: {
                rgba: [0, 255, 0, 1],
                hex: '#0F0'
            }
        }
    ]
};

module.exports = data;
