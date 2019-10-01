import Layout from '../components/Layout'
import { withTranslation } from '../i18n';
import PropTypes from 'prop-types'

const about = ({ t }) => {
    return (
        <Layout>
            <p>{t('about-text')}</p>
        </Layout>
    )
}

about.getInitialProps = async () => ({
    namespacesRequired: ['about'],
})

about.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('about')(about)
