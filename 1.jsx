class CheckoutFormPersonal extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Personal info</h3>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={this.props.name}
                    onChange={this.props.onChangeName}
                />
                <input
                    type="text"
                    placeholder="Enter email"
                    value={this.props.email}
                    onChange={this.props.onChangeEmail}
                />

                <button>Next</button>
            </form>
        );
    }
}

class CheckoutFormShipping extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Shipping</h3>
                <input
                    type="text"
                    placeholder="Address line"
                    value={this.props.shippingLine}
                    onChange={this.props.onChangeShippingLine}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={this.props.shippingCity}
                    onChange={this.props.onChangeShippingCity}
                />
                <input
                    type="text"
                    placeholder="ZIP"
                    value={this.props.shippingZip}
                    onChange={this.props.onChangeShippingZip}
                />

                <button>Next</button>
            </form>
        );
    }
}

class CheckoutFormBilling extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Billing</h3>
                <input
                    type="text"
                    placeholder="Address line"
                    value={this.props.billingLine}
                    onChange={this.props.onChangeBillingLine}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={this.props.billingCity}
                    onChange={this.props.onChangeBillingCity}
                />
                <input
                    type="text"
                    placeholder="ZIP"
                    value={this.props.billingZip}
                    onChange={this.props.onChangeBillingZip}
                />

                <button>Checkout</button>
            </form>
        );
    }
}

class CheckoutForm extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,

            name: '',
            email: '',

            shipping_line: '',
            shipping_city: '',
            shipping_zip: '',

            billing_line: '',
            billing_city: '',
            billing_zip: '',
        };
        this.goToNext = this.goToNext.bind(this);
    }

    goToNext() {
        const { step } = this.state;
        if (step !== 3) {
            this.setState({ step: step + 1 });
        } else {
            alert('Submitting');

            const values = {
                name: this.state.name,
                email: this.state.email,
                shipping: {
                    line: this.state.shipping_line,
                    city: this.state.shipping_city,
                    zip: this.state.shipping_zip,
                },
                billing: {
                    line: this.state.billing_line,
                    city: this.state.billing_city,
                    zip: this.state.billing_zip,
                },
            };
            // submit `values` to the server here.
        }
    };

    handleChange(field) {
        return (evt) => this.setState({ [field]: evt.target.value });
    }

    render() {
        switch (this.state.step) {
            case 1:
                return <CheckoutFormPersonal
                    key="personal"
                    onSubmit={this.goToNext}
                    name={this.state.name}
                    email={this.state.email}
                    onChangeName={this.handleChange('name')}
                    onChangeEmail={this.handleChange('email')}
                />;
            case 2:
                return <CheckoutFormShipping
                    key="shipping"
                    onSubmit={this.goToNext}
                    shippingLine={this.state.shipping_line}
                    shippingCity={this.state.shipping_city}
                    shippingZip={this.state.shipping_zip}
                    onChangeShippingLine={this.handleChange('shipping_line')}
                    onChangeShippingCity={this.handleChange('shipping_city')}
                    onChangeShippingZip={this.handleChange('shipping_zip')}
                />;
            case 3:
                return <CheckoutFormBilling
                    key="billing"
                    onSubmit={this.goToNext}
                    billingLine={this.state.billing_line}
                    billingCity={this.state.billing_city}
                    billingZip={this.state.billing_zip}
                    onChangeBillingLine={this.handleChange('billing_line')}
                    onChangeBillingCity={this.handleChange('billing_city')}
                    onChangeBillingZip={this.handleChange('billing_zip')}
                />;
        }
    }
}

ReactDOM.render(<CheckoutForm />, document.body);