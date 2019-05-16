/**
 * Block dependencies
 */
import icons from './icons';
import './editor.scss';
import './style.css';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    Editable,
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
    InspectorControls,
    RichText,
    URLInput,
    PanelColorSettings,
} = wp.editor;
const {
    Button,
    SelectControl,
    RadioControl,
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
} = wp.components;
const { Fragment } = wp.element;

/**
 * Register example block
 */
export default registerBlockType(
    'cgb/clb-button',
    {
        title: __( 'Icon Card', 'clb-icon-card' ),
        description: __( 'Add an icon card to your grid ', 'clb-icon-card'),
        category: 'common',
        parent: ['cgb/icon-card-grid'],
	   icon: {
             foreground: '#555d66',
	        background: 'transparent',
	        src: 'admin-links',
	   },
        keywords: [ __( 'icon' ), __( 'card' ), __( 'grid' ) ],
        attributes: {
          buttonText: {
			source: 'html',
			selector: '.clb-button__text',
			// default: __( 'Card Title' ),
		},
          buttonLink: {
                type: 'string',
                source: 'attribute',
                attribute: 'href',
                selector: 'a',
            },
          backgroundColor: {
              type: 'string',
              default: '#0066cc'
          },
        },
        edit: props => {
            const { attributes: { buttonText, buttonLink, backgroundColor },
                className, setAttributes, isSelected } = props;

            const onChangeButtonText = buttonText => { setAttributes( { buttonText } ) };
            const onChangeButtonLink = buttonLink => { setAttributes( { buttonLink } ) };

            return (
			  <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Button Settings', 'clbbutton' ) }
                   >
                       <PanelRow>
                            <PanelColorSettings
                            title={'Background Color'}
                            colorSettings={[
                              {
                               label: "Color Picker",
                               value: backgroundColor,
                               onChange: backgroundColor => {
                                  setAttributes({ backgroundColor });
                               }
                              }
                            ]}
                         />
                       </PanelRow>
                   </PanelBody>
               </InspectorControls>

               <div className={ className } >
               { isSelected ? (

                    <div className ={ className + "-selected" } >
                        <TextControl
                            className='clb-button__text'
                            label={ 'Button Text' }
                            value={ buttonText }
                            placeholder={ 'Learn More' }
                            onChange={ onChangeButtonText }
                       />
                       <URLInput
                               className="clb-button__link"
                               value={ buttonLink }
                               onChange = { onChangeButtonLink }
                           />
                         </div>
                    ) : (

                       <div className="clb-button-static">
                           <strong>{buttonText}</strong>
                      </div>

                            ) }

                            </div>
                         </Fragment>
                    )},

        save: props => {

            const { buttonText, buttonLink, backgroundColor } = props.attributes;

            return (

                 <div className="clb-button-area" >
                      <a href={buttonLink} className="button full clb-button" style={ { backgroundColor: backgroundColor } }>
                               <div className="clb-button__text">{buttonText}</div>
                         </a>
                    </div>

            );
        },
    },
);
