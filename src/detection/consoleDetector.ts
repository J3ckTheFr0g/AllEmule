import { ConsoleType } from '../models/consoleTypes';

export type DetectionConfidence = 'certain' | 'probable' | 'ambiguous';

export interface DetectionResult {
  type: ConsoleType;
  confidence: DetectionConfidence;
}

export class AmbiguousRomError extends Error {
  constructor(public bestGuess: ConsoleType, public fileName: string) {
    super(
      `ROM ambigue (${fileName}) : meilleure hypothese = ${bestGuess}. ` +
        `Confirmation utilisateur requise.`,
    );
  }
}

const GB_NINTENDO_LOGO = new Uint8Array([
  0xce, 0xed, 0x66, 0x66, 0xcc, 0x0d, 0x00, 0x0b, 0x03, 0x73, 0x00, 0x83,
  0x00, 0x0c, 0x00, 0x0d, 0x00, 0x08, 0x11, 0x1f, 0x88, 0x89, 0x00, 0x0e,
  0xdc, 0xcc, 0x6e, 0xe6, 0xdd, 0xdd, 0xd9, 0x99, 0xbb, 0xbb, 0x67, 0x63,
  0x6e, 0x0e, 0xec, 0xcc, 0xdd, 0xdc, 0x99, 0x9f, 0xbb, 0xb9, 0x33, 0x3e,
]);

export class ConsoleDetector {
  detect(bytes: Uint8Array, fileName: string): DetectionResult {
    const gb = this.tryGameBoyHeader(bytes);
    if (gb) return gb;

    const gba = this.tryGbaHeader(bytes);
    if (gba) return gba;

    const lynx = this.tryLynxMagic(bytes);
    if (lynx) return lynx;

    return this.detectByExtension(bytes, fileName);
  }

  private bytesMatch(data: Uint8Array, offset: number, pattern: Uint8Array): boolean {
    if (offset + pattern.length > data.length) return false;
    for (let i = 0; i < pattern.length; i++) {
      if (data[offset + i] !== pattern[i]) return false;
    }
    return true;
  }

  private tryGameBoyHeader(bytes: Uint8Array): DetectionResult | null {
    if (bytes.length < 0x150) return null;
    if (!this.bytesMatch(bytes, 0x104, GB_NINTENDO_LOGO)) return null;

    const checksumOk = this.validateGbChecksum(bytes);
    const cgbFlag = bytes[0x143];
    const isColor = cgbFlag === 0x80 || cgbFlag === 0xc0;

    return {
      type: isColor ? ConsoleType.GameBoyColor : ConsoleType.GameBoy,
      confidence: checksumOk ? 'certain' : 'probable',
    };
  }

  private validateGbChecksum(bytes: Uint8Array): boolean {
    let checksum = 0;
    for (let i = 0x134; i <= 0x14c; i++) {
      checksum = checksum - bytes[i] - 1;
    }
    return (checksum & 0xff) === bytes[0x14d];
  }

  private tryGbaHeader(bytes: Uint8Array): DetectionResult | null {
    if (bytes.length < 0xc0) return null;
    if (bytes[0xb2] !== 0x96) return null;
    if (bytes[0xb3] !== 0x00) return null;

    const checksumOk = this.validateGbaChecksum(bytes);

    return {
      type: ConsoleType.GameBoyAdvance,
      confidence: checksumOk ? 'certain' : 'probable',
    };
  }

  private validateGbaChecksum(bytes: Uint8Array): boolean {
    let checksum = 0;
    for (let i = 0xa0; i <= 0xbc; i++) {
      checksum -= bytes[i];
    }
    checksum = (checksum - 0x19) & 0xff;
    return checksum === bytes[0xbd];
  }

  private tryLynxMagic(bytes: Uint8Array): DetectionResult | null {
    if (bytes.length < 4) return null;
    const magic = String.fromCharCode(...bytes.slice(0, 4));
    if (magic === 'LYNX') {
      return { type: ConsoleType.AtariLynx, confidence: 'certain' };
    }
    return null;
  }

  private detectByExtension(bytes: Uint8Array, fileName: string): DetectionResult {
    const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
    const size = bytes.length;

    switch (ext) {
      case 'gg':
        return { type: ConsoleType.SegaGameGear, confidence: 'probable' };
      case 'pce': {
        const confidence: DetectionConfidence =
          size % (128 * 1024) === 0 ? 'probable' : 'ambiguous';
        return { type: ConsoleType.PcEngineGt, confidence };
      }
      case 'ngp':
      case 'ngc':
        return { type: ConsoleType.NeoGeoPocket, confidence: 'probable' };
      case 'sv':
        return { type: ConsoleType.WataraSupervision, confidence: 'ambiguous' };
      case 'smc':
      case 'fxe':
      case 'gxb':
        return { type: ConsoleType.Gp32, confidence: 'ambiguous' };
      default:
        return { type: ConsoleType.Unknown, confidence: 'ambiguous' };
    }
  }
}

export async function readRomFile(file: File): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer();
  return new Uint8Array(buffer);
}
