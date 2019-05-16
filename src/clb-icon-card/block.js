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
    'cgb/clb-icon-card',
    {
        title: __( 'Icon Card', 'clb-icon-card' ),
        description: __( 'Add an icon card to your grid ', 'clb-icon-card'),
        category: 'common',
        parent: ['cgb/icon-card-grid'],
	   icon: {
             foreground: '#555d66',
	        background: 'transparent',
	        src: 'media-video',
	   },
        keywords: [ __( 'icon' ), __( 'card' ), __( 'grid' ) ],
        attributes: {
          iconCardTitle: {
			source: 'html',
			selector: '.clb_card__title',
			// default: __( 'Card Title' ),
		},
          iconCardLink: {
                type: 'string',
                source: 'attribute',
                attribute: 'href',
                selector: 'a',
            },
          backgroundColor: {
              type: 'string',
              default: '#555d66'
          },
        },
        edit: props => {
            const { attributes: { iconCardTitle, iconCardLink, backgroundColor },
                className, setAttributes, isSelected } = props;

            const onChangeIconCardTitle = iconCardTitle => { setAttributes( { iconCardTitle } ) };
            const onChangeIconCardLink = iconCardLink => { setAttributes( { iconCardLink } ) };

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
                            className='clb_card__title'
                            label={ 'Icon Card Title' }
                            value={ iconCardTitle }
                            placeholder={ 'Your Headline Here' }
                            onChange={ onChangeIconCardTitle }
                       />
                       <URLInput
                               className="clb-icon-card__link"
                               value={ iconCardLink }
                               onChange = { onChangeIconCardLink }
                           />
                         </div>
                    ) : (

                       <div className="clb-icon-card-static">
                           <strong>{iconCardTitle}</strong>
                      </div>

                            ) }

                            </div>
                         </Fragment>
                    )},

        save: props => {

            const { iconCardTitle, iconCardLink, backgroundColor } = props.attributes;

            return (

                 <div className="clb-icon-card-area" >
                      <a href={iconCardLink} className="button full clb-icon-card" style={ { backgroundColor: backgroundColor } }>
                               <div className="clb_card__title">{iconCardTitle}</div>
                         </a>
                    </div>

            );
        },
    },
);
