import {Component} from '@angular/core';

@Component({
	selector:"person-list",
	templateUrl:"./personlist.component.html"
})
export class PersonList {
	list = [
	{
		"firstname": "Fitzgerald",
		"lastname": "Norton"
	},
	{
		"firstname": "Dylan",
		"lastname": "Hawkins"
	},
	{
		"firstname": "Gil",
		"lastname": "Oliver"
	},
	{
		"firstname": "Thor",
		"lastname": "Ramsey"
	},
	{
		"firstname": "Hayley",
		"lastname": "Pratt"
	},
	{
		"firstname": "Lacy",
		"lastname": "Robles"
	},
	{
		"firstname": "Velma",
		"lastname": "Ross"
	},
	{
		"firstname": "Britanni",
		"lastname": "Barnett"
	},
	{
		"firstname": "Yen",
		"lastname": "Phelps"
	},
	{
		"firstname": "Herman",
		"lastname": "Battle"
	},
	{
		"firstname": "Uriah",
		"lastname": "Garner"
	},
	{
		"firstname": "Hasad",
		"lastname": "Barton"
	},
	{
		"firstname": "Arsenio",
		"lastname": "Reed"
	},
	{
		"firstname": "Kaseem",
		"lastname": "Kerr"
	},
	{
		"firstname": "Abel",
		"lastname": "Navarro"
	},
	{
		"firstname": "Julian",
		"lastname": "Cummings"
	},
	{
		"firstname": "Ivana",
		"lastname": "Stevens"
	},
	{
		"firstname": "Callie",
		"lastname": "Gutierrez"
	},
	{
		"firstname": "Howard",
		"lastname": "Chan"
	},
	{
		"firstname": "Nelle",
		"lastname": "Stuart"
	},
	{
		"firstname": "Walter",
		"lastname": "Kelley"
	},
	{
		"firstname": "Hanna",
		"lastname": "Todd"
	},
	{
		"firstname": "Shelby",
		"lastname": "Mason"
	},
	{
		"firstname": "Kyle",
		"lastname": "Vargas"
	},
	{
		"firstname": "Harrison",
		"lastname": "Mckee"
	},
	{
		"firstname": "Abbot",
		"lastname": "Callahan"
	},
	{
		"firstname": "Kibo",
		"lastname": "Francis"
	},
	{
		"firstname": "Raya",
		"lastname": "Hoffman"
	},
	{
		"firstname": "Illana",
		"lastname": "Ward"
	},
	{
		"firstname": "Maggie",
		"lastname": "Hammond"
	},
	{
		"firstname": "Shay",
		"lastname": "Shepard"
	},
	{
		"firstname": "Chelsea",
		"lastname": "Slater"
	},
	{
		"firstname": "Uma",
		"lastname": "Vazquez"
	},
	{
		"firstname": "David",
		"lastname": "Hunt"
	},
	{
		"firstname": "Maxwell",
		"lastname": "Haynes"
	},
	{
		"firstname": "Quinn",
		"lastname": "Gilliam"
	},
	{
		"firstname": "Ashely",
		"lastname": "Oneil"
	},
	{
		"firstname": "Aspen",
		"lastname": "Lambert"
	},
	{
		"firstname": "Xandra",
		"lastname": "Macias"
	},
	{
		"firstname": "Zephania",
		"lastname": "Bonner"
	},
	{
		"firstname": "Madeline",
		"lastname": "Solomon"
	},
	{
		"firstname": "Eleanor",
		"lastname": "Boyd"
	},
	{
		"firstname": "Leonard",
		"lastname": "Allen"
	},
	{
		"firstname": "Germane",
		"lastname": "Fuentes"
	},
	{
		"firstname": "Orlando",
		"lastname": "Parks"
	},
	{
		"firstname": "Jeremy",
		"lastname": "Kaufman"
	},
	{
		"firstname": "Kelly",
		"lastname": "Burks"
	},
	{
		"firstname": "Karleigh",
		"lastname": "Carpenter"
	},
	{
		"firstname": "Sybill",
		"lastname": "Cochran"
	},
	{
		"firstname": "Libby",
		"lastname": "Payne"
	},
	{
		"firstname": "Fulton",
		"lastname": "Elliott"
	},
	{
		"firstname": "Holmes",
		"lastname": "Oneal"
	},
	{
		"firstname": "Denise",
		"lastname": "Bridges"
	},
	{
		"firstname": "Kasimir",
		"lastname": "Lara"
	},
	{
		"firstname": "Sylvester",
		"lastname": "Bolton"
	},
	{
		"firstname": "Reagan",
		"lastname": "Lambert"
	},
	{
		"firstname": "Erich",
		"lastname": "Henson"
	},
	{
		"firstname": "Sopoline",
		"lastname": "Swanson"
	},
	{
		"firstname": "Nichole",
		"lastname": "Macias"
	},
	{
		"firstname": "Kamal",
		"lastname": "Rich"
	},
	{
		"firstname": "Lillian",
		"lastname": "Daniels"
	},
	{
		"firstname": "Nash",
		"lastname": "Moody"
	},
	{
		"firstname": "Rashad",
		"lastname": "Lane"
	},
	{
		"firstname": "Briar",
		"lastname": "Dudley"
	},
	{
		"firstname": "Tatyana",
		"lastname": "Marsh"
	},
	{
		"firstname": "Zelda",
		"lastname": "Moon"
	},
	{
		"firstname": "Melanie",
		"lastname": "Stout"
	},
	{
		"firstname": "Sharon",
		"lastname": "Waller"
	},
	{
		"firstname": "Lysandra",
		"lastname": "Patrick"
	},
	{
		"firstname": "Adena",
		"lastname": "Mccullough"
	},
	{
		"firstname": "Mollie",
		"lastname": "Nelson"
	},
	{
		"firstname": "Sophia",
		"lastname": "Gibson"
	},
	{
		"firstname": "Alan",
		"lastname": "William"
	},
	{
		"firstname": "Janna",
		"lastname": "Petty"
	},
	{
		"firstname": "Sydney",
		"lastname": "Reid"
	},
	{
		"firstname": "Vernon",
		"lastname": "Guerrero"
	},
	{
		"firstname": "Jennifer",
		"lastname": "Merritt"
	},
	{
		"firstname": "Aristotle",
		"lastname": "Ballard"
	},
	{
		"firstname": "Carl",
		"lastname": "Frost"
	},
	{
		"firstname": "Xavier",
		"lastname": "Armstrong"
	},
	{
		"firstname": "Marvin",
		"lastname": "Puckett"
	},
	{
		"firstname": "Ebony",
		"lastname": "Mason"
	},
	{
		"firstname": "Bruno",
		"lastname": "Rosa"
	},
	{
		"firstname": "Jack",
		"lastname": "Richardson"
	},
	{
		"firstname": "Ulla",
		"lastname": "May"
	},
	{
		"firstname": "Amber",
		"lastname": "Holder"
	},
	{
		"firstname": "Vance",
		"lastname": "Levy"
	},
	{
		"firstname": "Hashim",
		"lastname": "Griffin"
	},
	{
		"firstname": "Hector",
		"lastname": "Stephens"
	},
	{
		"firstname": "Reuben",
		"lastname": "Dillon"
	},
	{
		"firstname": "Risa",
		"lastname": "Santos"
	},
	{
		"firstname": "Lavinia",
		"lastname": "Estes"
	},
	{
		"firstname": "Bernard",
		"lastname": "Pruitt"
	},
	{
		"firstname": "Nicole",
		"lastname": "Wilcox"
	},
	{
		"firstname": "Merrill",
		"lastname": "Hurley"
	},
	{
		"firstname": "Cooper",
		"lastname": "Nicholson"
	},
	{
		"firstname": "Idona",
		"lastname": "Browning"
	},
	{
		"firstname": "Serena",
		"lastname": "Juarez"
	},
	{
		"firstname": "Winifred",
		"lastname": "Hayden"
	},
	{
		"firstname": "Jaquelyn",
		"lastname": "Reid"
	}
]
}