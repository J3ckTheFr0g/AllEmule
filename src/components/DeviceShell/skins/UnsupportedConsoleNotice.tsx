import './UnsupportedConsoleNotice.css';

export interface UnsupportedConsoleNoticeProps {
  /** Nom lisible de la console a afficher (ex: "Watara Supervision"). */
  consoleName: string;
  /**
   * Raison courte et honnete de l'indisponibilite, affichee sous le titre.
   * Un texte par defaut generique est utilise si non fourni.
   */
  reason?: string;
  /** Callback optionnel pour un bouton "Retour" / fermeture du bandeau. */
  onDismiss?: () => void;
}

/**
 * Ecran de substitution affiche a la place du lecteur EmulatorJS quand la
 * console detectee n'a pas (encore) de coeur d'emulation Wasm disponible
 * (cf. CONSOLE_SPECS `supportStatus: 'excluded'`, ex: Watara Supervision,
 * Game & Watch, GP32).
 *
 * Contrairement a un message d'erreur technique brut, ce composant explique
 * honnetement la situation a l'utilisateur (aucun portage Wasm connu du
 * coeur d'emulation pour cette console) tout en restant dans l'esthetique
 * "boitier de console" du reste de l'app : le message est presente comme
 * si l'on regardait a travers l'ecran d'un boitier generique, plutot que
 * via une alerte de navigateur ou un texte brut hors contexte.
 *
 * Composant autonome : il ne consulte pas CONSOLE_SPECS ni DeviceShell,
 * le nom de la console lui est passe en prop par l'appelant.
 */
export function UnsupportedConsoleNotice({
  consoleName,
  reason,
  onDismiss,
}: UnsupportedConsoleNoticeProps) {
  return (
    <div className="unsupported-console" role="alert" aria-label={`${consoleName} non jouable`}>
      <div className="unsupported-console__body">
        <div className="unsupported-console__screen-bezel">
          <div className="unsupported-console__screen">
            <div className="unsupported-console__icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" width="40" height="40">
                <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <line x1="24" y1="14" x2="24" y2="27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <circle cx="24" cy="34" r="1.8" fill="currentColor" />
              </svg>
            </div>

            <p className="unsupported-console__title">{consoleName} non jouable ici</p>

            <p className="unsupported-console__reason">
              {reason ??
                `Aucun coeur d'emulation Wasm compatible EmulatorJS n'existe a ce jour pour ${consoleName}. ` +
                  "Ce n'est pas un bug de l'application : cette console n'est pas encore supportee dans le navigateur."}
            </p>

            <p className="unsupported-console__hint">
              La ROM a bien ete detectee, mais elle ne peut pas etre lancee tant qu'un
              portage de coeur adapte ne sera pas disponible.
            </p>
          </div>
        </div>

        {onDismiss && (
          <button type="button" className="unsupported-console__dismiss" onClick={onDismiss}>
            Retour
          </button>
        )}
      </div>
    </div>
  );
}
