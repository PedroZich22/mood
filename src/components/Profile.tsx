import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatDate } from "@/utils/date";
import { Pencil, Save, UserCircle } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const { profile, updateProfile, deleteAccount, isLoading } = useProfile();
  const { showSuccess, showError } = useToast();
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name || user?.name || "",
        email: profile.email || user?.email || "",
      });
    }
  }, [profile, user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        name: profileData.name,
        email: profileData.email,
      });
      
      showSuccess("Conta atualizada com sucesso!");
      setIsEditing(false);
    } catch (error) {
      showError(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Você realmente quer deletar sua conta? Essa ação não poderá ser desfeita"
      )
    )
      return;

    try {
      await deleteAccount();
      await logout();
      showSuccess("Conta deletada com sucesso!");
    } catch (error) {
      showError(error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-brown-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="h-32 bg-brown-100 rounded"></div>
            </Card>
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="h-64 bg-brown-100 rounded"></div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Configurações do Perfil"
        description="Gerencie as configurações da sua conta e preferências."
        badge={{ icon: UserCircle, text: "Seu perfil" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="p-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-brown-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <h2 className="heading-md mb-1">{profileData.name}</h2>
            <p className="text-brown-600 font-light mb-4">
              {profileData.email}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-brown-600">Membro desde:</span>
                <span className="text-brown-800">
                  {profile?.createdAt && formatDate(profile.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="items-center justify-between">
              <CardTitle>Configurações da conta</CardTitle>
              {isEditing ? (
                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                    size="sm"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2"
                    size="sm"
                  >
                    <Save size={16} />
                    <span>{isSaving ? "Salvando..." : "Salvar Alterações"}</span>
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  <Pencil size={16} className="mr-2" />
                  Editar perfil
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">
                      Nome completo
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">
                      Endereço de e-mail
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Gerenciamento de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-red-700">Deletar conta</h3>
                    <p className="text-sm text-brown-600">
                      Delete sua conta permanentemente
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    size="sm"
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;