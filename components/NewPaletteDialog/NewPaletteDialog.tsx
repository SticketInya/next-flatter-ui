import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import { ColorPalettesContext } from '../../contexts/ColorPalettes.context';

//Material UI
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import styles from './NewPaletteDialog.module.scss';

interface props {
    dialogOpen: boolean;
    paletteName: string;
    updatePaletteName: (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => void;
    toggleDialogOpen: () => void;
    handleSubmit: (e: FormEvent<Element>) => void;
}

export default function NewPaletteDialog({
    dialogOpen,
    paletteName,
    updatePaletteName,
    toggleDialogOpen,
    handleSubmit,
}: props): JSX.Element {
    const { allPalettes } = useContext(ColorPalettesContext);

    useEffect(() => {
        // @ts-ignore: Unreachable code error
        if (!ValidatorForm.hasValidationRule('isPaletteNameUnique')) {
            ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
                return allPalettes.every((palette) => {
                    return (
                        palette.paletteName.toLowerCase() !==
                        value.toLowerCase()
                    );
                });
            });
        }

        return function cleanCustomRules() {
            // @ts-ignore: Unreachable code error
            if (ValidatorForm.hasValidationRule('isPaletteNameUnique')) {
                ValidatorForm.removeValidationRule('isPaletteNameUnique');
            }
        };
    });

    return (
        <div className={styles.dialog}>
            <Dialog
                open={dialogOpen}
                onClose={toggleDialogOpen}
                className={styles.dialog}
                sx={{
                    '.MuiPaper-root': {
                        backgroundColor: '#272727',
                    },
                }}
            >
                <DialogTitle className={styles.diaTitle}>
                    Name Your Color Palette
                </DialogTitle>
                <ValidatorForm
                    onSubmit={handleSubmit}
                    instantValidate={false}
                    className={styles.form}
                >
                    <DialogContent className={styles.diaContent}>
                        <DialogContentText className={styles.diaContext}>
                            Please give a unique a wondorous name to Your Color
                            Palette!
                        </DialogContentText>

                        <TextValidator
                            className={styles.textfield}
                            name='paletteName'
                            label='Palette name'
                            value={paletteName}
                            onChange={updatePaletteName}
                            autoFocus
                            fullWidth
                            variant='standard'
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={[
                                'This field is required',
                                'Palette name must be unique',
                            ]}
                        />
                    </DialogContent>
                    <DialogActions className={styles.btns}>
                        <button
                            onClick={toggleDialogOpen}
                            className={styles.cancel}
                        >
                            Cancel
                        </button>
                        <button type='submit' className={styles.save}>
                            Save Palette
                        </button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}
