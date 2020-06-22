import Colors from '../Colors';

export default [
  {
    title: 'Solde',
    background: Colors.Primary,
    textColor: "white",
	Stroke: Colors.Accent,
	icon: "currency-eur",
	SubCategories: [
		{
			key: "1",
			image:"data:image/jpeg;base64,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",
			title:"Euro Paysera",
			background:"#127FC4",
			textColor:"white",
			originaltype:"currency",
			type:"currency",
			checked:false,
			custom:false,
            requirements: ["email"],
            original_requirements: ["email"]
		},
		{
			key: "2",
			image:"https://yt3.ggpht.com/a/AGF-l79DM5ZR8oZ8sWDWpgcjdU7GLydiLATOqPea5g=s900-c-k-c0xffffffff-no-rj-mo",
			title:"Payoneer",
			background:"#FE4600",
			textColor:"white",
			originaltype:"currency",
			type:"currency",
			checked:false,
			custom:false,
            requirements: ["email"],
            original_requirements: ["email"]
		},
		{
			key: "3",
			image:"https://cdn.iconscout.com/icon/premium/png-512-thumb/webmoney-429220.png",
			title:"WebMoney",
			background:"#EEEEEE",
			textColor:"black",
			originaltype:"currency",
			type:"currency",
			checked:false,
			custom:false,
            requirements: ["email"],
            original_requirements: ["email"]
		},
		{
			key: "4",
			image:"https://i1.wp.com/blog.cashu.com/wp-content/uploads/2020/04/cashu-logo.png?fit=400%2C400&ssl=1",
			title:"CashU",
			background:"#00AEEF",
			textColor:"white",
			originaltype:"currency",
			type:"currency",
			checked:false,
			custom:false,
            requirements: ["email"],
            original_requirements: ["email"]
		},
		{
			key: "5",
			image:"https://cdn.pixabay.com/photo/2013/12/08/12/12/bitcoin-225079_960_720.png",
			title:"Bitcoin",
			background:"white",
			textColor:"orange",
			originaltype:"currency",
			type:"currency",
			checked:false,
			custom:false,
            requirements: ["email"],
            original_requirements: ["email"]
		},
		{
			key: "6",
			image:"https://lh3.googleusercontent.com/0Ktf__nZwzaOREU65gblBudmol8b9MZ1FSP1VKnROdJybeyFuTQZWYZzDXFAyhsvnaE=w300",
			title:"Payeer",
			background:"#38BDF9",
			textColor:"white",
			originaltype:"currency",
			type:"currency",
			checked:false,
            requirements: ["email"],
            original_requirements: ["email"]
		},
		{
			key: "7",
			image:"https://member.neteller.com/assets/apple-touch-icon-4ffcb1e26faf27ab2f0af659eefb35f5.png",
			title:"Neteller",
			background:"#8BC53D",
			textColor:"white",
			originaltype:"currency",
			type:"currency",
			checked:false,
			custom:false,
            requirements: ["email"],
            original_requirements: ["email"]
		},
		{
			key: "8",
			image:"https://cdn.1min30.com/wp-content/uploads/2017/09/Paypal-logo.jpg",
			title:"PayPal",
			background:"white",
			textColor:"#051467",
			originaltype:"currency",
			type:"currency",
			checked:false,
			custom:false,
            requirements: ["email"],
            original_requirements: ["email"]
		},
		{
			key: "9",
			image:"https://cdn0.iconfinder.com/data/icons/ui-line-7/24/lineArtboard_10-512.png",
			title:"Autre",
			background:"white",
			textColor:"black",
			originaltype:"currency",
			type:"currency",
			checked:false,
			custom:true,
            requirements: ["email"],
            original_requirements: ["email"]
		}
	]
  },
  {
    title: 'Giftcards',
    background: Colors.Primary,
    textColor: "white",
	icon: "wallet-giftcard",
	Stroke: Colors.Accent,
	SubCategories: [
		{
			key: "1",
			image:"https://www.arthurholm.com/wp-content/uploads/2019/06/GooglePlay-logo.png",
			title:"GiftCard Google Play",
			background:"white",
			textColor:"black",
			originaltype:"item",
			type:"item",
			checked:false,
			custom:false,
            requirements: [],
            original_requirements: []
		},
		{
			key: "2",
			image:"https://www.arthurholm.com/wp-content/uploads/2019/06/GooglePlay-logo.png",
			title:"Recharger Un Compte Google Play",
			background:"white",
			textColor:"black",
			originaltype:"item",
			type:"item",
			checked:false,
			custom:false,
            requirements: ["email", "password"],
            original_requirements: ["email", "password"]
		},
		{
			key: "3",
			image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1200px-Steam_icon_logo.svg.png",
			title:"Steam",
			background:"#222",
			textColor:"white",
			originaltype:"item",
			type:"item",
			checked:false,
			custom:false,
            requirements: [],
            original_requirements: []
		},
		{
			key: "4",
			image:"https://cdn0.iconfinder.com/data/icons/ui-line-7/24/lineArtboard_10-512.png",
			title:"Autre",
			background:"white",
			textColor:"black",
			originaltype:"item",
			type:"item",
			checked:false,
			custom:true,
            requirements: [],
            original_requirements: []
		}
	]
  },
  {
    title: 'Games',
    background: Colors.Primary,
    textColor: "white",
	icon: "xbox-controller",
	Stroke: Colors.Accent,
	SubCategories: [
		{
			key: "1",
			image:"https://cdn.iconscout.com/icon/premium/png-512-thumb/game-159-209696.png",
			title:"Game Code",
			background:"white",
			textColor:"black",
			originaltype:"item",
			type:"item",
			checked:false,
			custom:true,
            requirements: [],
            original_requirements: []
		},
		{
			key: "2",
			image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png",
			title:"Game Account",
			background:"white",
			textColor:"black",
			originaltype:"item",
			type:"item",
			checked:false,
			custom:true,
            requirements: [],
            original_requirements: []
		},
		{
			key: "3",
			image:"https://i1.pngguru.com/preview/83/704/998/desktop-crystal-icons-diamond-sh-png-icon.jpg",
			title:"Diamonds Pubg",
			background:"#555",
			textColor:"white",
			originaltype:"currency",
			type:"currency",
			checked:false,
			custom:false,
            requirements: ["email", "password"],
            original_requirements: ["email", "password"]
		},
		{
			key: "4",
			image:"https://i1.pngguru.com/preview/83/704/998/desktop-crystal-icons-diamond-sh-png-icon.jpg",
			title:"Diamonds FreeFire",
			background:"#555",
			textColor:"white",
			originaltype:"currency",
			type:"currency",
			checked:false,
			custom:false,
            requirements: ["email", "password"],
            original_requirements: ["email", "password"]
		},
		{
			key: "5",
			image:"https://cdn0.iconfinder.com/data/icons/ui-line-7/24/lineArtboard_10-512.png",
			title:"Autre",
			background:"white",
			textColor:"black",
			originaltype:"item",
			type:"item",
			checked:false,
			custom:true,
            requirements: [],
            original_requirements: []
		}
	]
  }
];
