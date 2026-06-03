import React from 'react';

const DigitalIDCard = ({ userProfile, status }) => {
  if (!userProfile) return null;

  return (
    <>
      {/* ID Card Section */}
      <section className="mb-stack-lg animate-fade-in">
        <div className="bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant overflow-hidden">
          <div className={`p-6 text-white flex justify-between items-center ${status === 'Terverifikasi' ? 'bg-secondary' : 'bg-surface-tint'}`}>
            <div>
              <h4 className="font-headline-sm text-headline-sm leading-none">{userProfile.nama}</h4>
              <p className="font-label-sm text-label-sm opacity-80 mt-1">
                Status: <span className={`px-2 py-0.5 rounded-full font-bold ${status === 'Terverifikasi' ? 'bg-white text-secondary' : 'bg-white text-surface-tint'}`}>{status}</span>
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl">
              {status === 'Terverifikasi' ? 'verified' : 'fingerprint'}
            </span>
          </div>
          <div className="p-6 grid grid-cols-1 gap-y-4">
            <div className="flex flex-col">
              <span className="text-on-surface-variant font-label-sm text-label-sm uppercase">NIK</span>
              <span className="text-on-surface font-body-md text-body-md font-semibold">{userProfile.nik}</span>
            </div>
            <div className="flex flex-col border-t border-surface-container pt-3">
              <span className="text-on-surface-variant font-label-sm text-label-sm uppercase">No. Paspor</span>
              <span className="text-on-surface font-body-md text-body-md font-semibold">{userProfile.paspor}</span>
            </div>
            <div className="flex flex-col border-t border-surface-container pt-3">
              <span className="text-on-surface-variant font-label-sm text-label-sm uppercase">Tempat Tanggal Lahir</span>
              <span className="text-on-surface font-body-md text-body-md font-semibold">{userProfile.ttl}</span>
            </div>
            <div className="flex flex-col border-t border-surface-container pt-3">
              <span className="text-on-surface-variant font-label-sm text-label-sm uppercase">Alamat Domisili</span>
              <span className="text-on-surface font-body-sm text-body-sm">
                {userProfile.alamat}
              </span>
            </div>
          </div>
          
          {status === 'Terverifikasi' && (
            <div className="px-6 pb-6 pt-2">
              <div className="bg-surface-container-low rounded-lg p-3 flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center border border-outline-variant">
                  <span className="material-symbols-outlined text-secondary">qr_code_2</span>
                </div>
                <div className="flex-1">
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Tunjukkan kode QR ini untuk verifikasi data instansi pemerintah terkait.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BlockID Visual Placeholder */}
      <section className="flex flex-col items-center justify-center p-8 bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant mb-stack-lg">
        <div className="max-w-[200px] shadow-2xl rounded-3xl overflow-hidden mb-4 bg-white flex items-center justify-center p-4">
          <span className="material-symbols-outlined text-6xl text-secondary opacity-50">badge</span>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant text-center max-w-[240px]">
          Preview Tampilan Kartu Identitas Digital SafeTKI untuk Keperluan Hukum.
        </p>
      </section>
    </>
  );
};

export default DigitalIDCard;
