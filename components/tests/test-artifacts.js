'use strict'

var artifacts = {
	contests: {
		contest1:{
			"slug": "voice2015",
			"name": "Voice2015",
			"start_date": "2015-04-23T18:25:43.511Z",
			"end_date": "2015-10-21T13:28:06.419Z"
		},
		wrongDate:{
			"slug": "voice2015",
			"name": "Voice2015",
			"start_date": "2015-04-23T18:25:43.511Z",
			"end_date": "2010-10-21T13:28:06.419Z"
		}
	},
	candidates: {
		candidate1: { "id":1, "name": "Maria" },
		candidate2: { "id":2, "name": "João" }
	}
};

module.exports = artifacts;