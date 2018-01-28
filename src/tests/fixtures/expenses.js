import moment from 'moment'

export default [{
	id: '1',
	note:'note',
	description:'gun',
	amount:1000,
	createdAt: 0
}, {
	id: '2',
	note: '',
	description:'knife',
	amount:500,
	createdAt: -1000
},{
	id:'3',
	note:'',
	description:'motolov',
	amount:600,
	createdAt: moment(0).subtract(4, 'days').valueOf(),
}, {
	id: '4',
	note:'',
	description:'bomb',
	amount:1600,
	createdAt: moment(0).add(4, 'days').valueOf(),
}]