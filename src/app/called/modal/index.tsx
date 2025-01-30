import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./styles.css";

const DialogDemo = () => (
	<Dialog.Root>
		<Dialog.Trigger asChild>
			<button className="Button violet">Fechar chamado</button>
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay className="DialogOverlay" />
			<Dialog.Content className="DialogContent">
				<Dialog.Title className="DialogTitle">Fechar chamado</Dialog.Title>

				<fieldset className="ContentMessage">
					<label className="Label" htmlFor="message">
						Responsa
					</label>
					<input className="inputMessage" id="message" defaultValue="" />
				</fieldset>
				
				<fieldset className="ContentAttachment">
					<label className="Label" htmlFor="inputAttachment">
						Arquivo
					</label>
					<input className="inputAttachment" id="attachment" type="file" defaultValue="" />
				</fieldset>

				<Dialog.Close asChild>
					<button className="IconButton" aria-label="Close">
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);

export default DialogDemo;