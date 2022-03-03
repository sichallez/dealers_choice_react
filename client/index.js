

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            resorts: []
        };
    };

    async componentDidMount() {
        try {
            const resorts = (await axios.get('/api/ski_resorts')).data;
            // console.log(resorts);
            this.setState({
                resorts
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <h1>Ski Resort Destinations</h1>
                <table>
                    <tr>
                        <th>Resort</th>
                        <th>Hours of Operation</th>
                        <th>Pass/Ticket</th>
                        <th>Lesson</th>
                        <th>Location</th>
                    </tr>
                    { this.state.resorts.map(resort => 
                        <tr>
                            <td>{ resort.name }</td>
                            <td>{ resort.hours }</td>
                            <td>{ resort.ticket }</td>
                            <td>{ resort.lesson }</td>
                            <td>{ resort.location }</td>
                        </tr>
                        ) }
                </table>    
            </div>
        );
    };
};

const root = document.querySelector('#root');
ReactDOM.render(<Main />, root);