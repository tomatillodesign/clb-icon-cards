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
          icon: {
               type: 'string',
               default: 'info-circle'
          },
          iconSize: {
               type: 'string',
               default: '4x'
          },
          iconStyle: {
               type: 'string',
               default: 'far'
          },
        },
        edit: props => {
            const { attributes: { iconCardTitle, iconCardLink, icon, iconSize, iconStyle, backgroundColor },
                className, setAttributes, isSelected } = props;

            const onChangeIconCardTitle = iconCardTitle => { setAttributes( { iconCardTitle } ) };
            const onChangeIconCardLink = iconCardLink => { setAttributes( { iconCardLink } ) };
            const onChangeIcon = icon => { setAttributes( { icon } ) };
            const onChangeIconSize = iconSize => { setAttributes( { iconSize } ) };
            const onChangeIconStyle = iconStyle => { setAttributes( { iconStyle } ) };

            return (
			  <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Icon Card Settings', 'clb-icon-card' ) }
                   >
                   <TextControl
                       label={ 'Icon' }
                       help={ 'Copy the icon text from fontawesome.com/icons. Eg: lightbulb-on' }
                       value={ icon }
                       onChange={ onChangeIcon }
                   />
                   <TextControl
                       label={ 'Icon Size' }
                       help={ 'Select the size of your icon. See: https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons' }
                       value={ iconSize }
                       onChange={ onChangeIconSize }
                   />
                   <SelectControl
                       label={ 'Icon Style' }
                       help={ 'Select the size of your icon. See: https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons' }
                       value={ iconStyle }
                       onChange={ onChangeIconStyle }
                       options={[
                        { label: "Solid", value: "fas" },
                        { label: "Regular", value: "far" },
                        { label: "Light", value: "fal" },
                        { label: "Brand", value: "fab" }
                      ]}
                   />
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

            const { iconCardTitle, iconCardLink, icon, iconSize, iconStyle, backgroundColor } = props.attributes;

            return (

                 <div className="clb-icon-card-area" >
                      <a href={iconCardLink} className="button full clb-icon-card" style={ { backgroundColor: backgroundColor } }>
                               <div className="clb-card-icon"><i className={ `${iconStyle} fa-${icon} fa-${iconSize}` }></i></div>
                               <h3 className="clb_card__title">{iconCardTitle}</h3>
                         </a>
                    </div>

            );
        },
    },
);
